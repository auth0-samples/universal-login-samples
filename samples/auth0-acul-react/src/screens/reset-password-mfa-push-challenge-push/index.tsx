import React, { useState, useEffect } from 'react';
import { useScreen, useTransaction, useUntrustedData, continueMethod, resendPushNotification, enterCodeManually, tryAnotherMethod, useResetPollingManager } from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const screen = useScreen();
  const transaction = useTransaction();
  const untrustedData = useUntrustedData();
  const { deviceName } = screen.data || {};

  useEffect(() => {
    const savedFormData = (untrustedData && (untrustedData as any).submittedFormData) || {};
    if (savedFormData.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, [untrustedData]);

  // Defensive: check for showRememberDevice in screen.data, fallback to false
  const showRememberDevice = (screen.data && (screen.data as any).showRememberDevice === true);

  // Polling state
  const polling = useResetPollingManager({
    intervalMs: 5000,
    onComplete: () => {
      continueMethod({ rememberDevice });
    },
    onError: (err) => {
      polling.stopPolling();
      console.error('Polling error:', err);
    },
  });

  const handleStartPolling = () => {
    if (!polling.isRunning) {
      polling.startPolling();
    }
  };
  const handleStopPolling = () => {
    if (polling.isRunning) {
      polling.stopPolling();
    }
  };

  const handleContinue = async () => {
    await continueMethod({ rememberDevice });
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendPushNotification({ rememberDevice });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    try {
      await enterCodeManually({ rememberDevice });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    try {
      await tryAnotherMethod({ rememberDevice });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen?.texts?.title ?? 'Verify Your Identity'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen?.texts?.description ?? 'We\'ve sent a notification to the following device via Auth0 Guardian app.'}
          {typeof deviceName === 'string' && deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>
        {/* Spinner and waiting message */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
        <p className="text-center text-sm text-gray-500 mb-4">
          Waiting for you to accept the push notification...
        </p>
        {/* Remember device checkbox (if applicable) */}
        {showRememberDevice && (
          <div className="flex items-center flex-start mb-4">
            <input
              id="rememberDevice"
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="rememberDevice"
              className="ml-2 block text-sm text-left text-gray-700"
            >
              {screen?.texts?.rememberMeText ?? 'Remember this device for 30 days'}
            </label>
          </div>
        )}
        {/* Error messages */}
        {transaction?.errors?.length && Array.isArray(transaction.errors) && (
          <div className="mb-4 space-y-1">
            {transaction.errors.map((err: any, index: number) => (
              <p key={index} className="text-red-600 text-sm text-center">
                {err.message}
              </p>
            ))}
          </div>
        )}
        {/* Action buttons */}
        <button
          onClick={handleStartPolling}
          disabled={polling.isRunning}
          className="w-full flex justify-center py-2 px-4 border border-green-500 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 mb-2"
        >
          Start Polling
        </button>
        <button
          onClick={handleStopPolling}
          disabled={!polling.isRunning}
          className="w-full flex justify-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 mb-2"
        >
          Stop Polling
        </button>
        <button
          onClick={handleContinue}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
        >
          {screen?.texts?.continueTextB2C ?? 'I\'ve responded on my device'}
        </button>
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
        >
          {screen?.texts?.resendActionText ?? 'Resend Code Manually'}
        </button>
        <button
          onClick={handleEnterCodeManually}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
        >
          {screen?.texts?.enterOtpCode ?? 'Enter Code Manually'}
        </button>
        <button
          onClick={handleTryAnotherMethod}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {screen?.texts?.tryAnotherMethod ?? 'Try Another Method'}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordMfaPushChallengePushScreen;