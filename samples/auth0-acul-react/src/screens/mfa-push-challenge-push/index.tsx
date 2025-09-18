import React, { useState, useEffect, useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { usePollingManager } from '@auth0/auth0-acul-react';
import { continueMethod } from '@auth0/auth0-acul-react/mfa-push-challenge-push';
import { Logo } from '../../components/Logo';

const MfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const mfaPushChallengePush = useMemo(() => new MfaPushChallengePush(), []);
  const { screen, transaction } = mfaPushChallengePush;
  const { deviceName, showRememberDevice } =
    mfaPushChallengePush.screen.data || {};
    
  // Initialize form values from untrustedData
  useEffect(() => {
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaPushChallengePush.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);
  console.log('kkkmsmmjj')
  console.log('hsfsjnjdsf')
  const screenText = {
    title: screen.texts?.title ?? 'Push Notification Sent',
    description:
      screen.texts?.description ??
      "We've sent a push notification to your device",
    rememberMe:
      screen.texts?.rememberMeText ?? 'Remember this device for 30 days',
    resend: screen.texts?.resendActionText ?? 'Resend Push Notification',
    enterCode: screen.texts?.enterOtpCode ?? 'Enter Code Manually',
    tryAnother: screen.texts?.pickAuthenticatorText ?? 'Try Another Method',
    waiting:
      screen.texts?.spinner_push_notification_label ??
      'Waiting for you to accept the push notification...',
    errorResend: 'Failed to resend push notification. Please try again.',
    errorManualCode: 'Failed to switch to manual code entry. Please try again.',
    errorAnotherMethod:
      'Failed to switch authentication method. Please try again.',
  };

  // Polling state
  const polling = usePollingManager({
    intervalMs: 5000,
    onComplete: () => {
      continueMethod({ rememberDevice });
    },
    onError: (err) => {
      polling.stopPolling();
      console.error('Polling error:', err);
    },
  });

  // Start/stop polling only on button click
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

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.resendPushNotification({ rememberDevice });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.enterCodeManually({ rememberDevice });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.tryAnotherMethod({ rememberDevice });
    } catch (err) {
      console.log(err);
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
          {screenText.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screenText.description}
          {deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>
        {/* Spinner and waiting message */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
        <p className="text-center text-sm text-gray-500 mb-4">
          {screenText.waiting}
        </p>
        {/* Remember device checkbox */}
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
              {screenText.rememberMe}
            </label>
          </div>
        )}
        {/* Error messages */}
        {transaction?.errors?.length && (
          <div className="mb-4 space-y-1">
            {transaction.errors.map((err, index) => (
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
          onClick={handleResend}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
        >
          {screenText.resend}
        </button>
        <button
          onClick={handleEnterCodeManually}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
        >
          {screenText.enterCode}
        </button>
        <button
          onClick={handleTryAnotherMethod}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {screenText.tryAnother}
        </button>
      </div>
    </div>
  );
};

export default MfaPushChallengePushScreen;