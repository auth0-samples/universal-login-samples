import React, { useState, useEffect } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

const ResetPasswordMfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
  const { deviceName } = resetPasswordMfaPushChallengePush.screen.data || {};

  useEffect(() => {
    // Start polling for push notification acceptance
    const pollInterval = setInterval(async () => {
      try {
        await resetPasswordMfaPushChallengePush.continue();
        // If successful, the page will redirect
      } catch (error) {
        // Ignore polling errors
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPasswordMfaPushChallengePush.resendPushNotification();
    } catch (err) {
      setError('Failed to resend push notification. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPasswordMfaPushChallengePush.enterCodeManually();
    } catch (err) {
      setError('Failed to switch to manual code entry. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPasswordMfaPushChallengePush.tryAnotherMethod();
    } catch (err) {
      setError('Failed to switch authentication method. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Push Notification Sent
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a push notification to your device
          {deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
            
            <p className="text-center text-sm text-gray-500">
              Waiting for you to accept the push notification...
            </p>

            <button
              onClick={handleResend}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Resend Push Notification
            </button>

            <button
              onClick={handleEnterCodeManually}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Enter Code Manually
            </button>

            <button
              onClick={handleTryAnotherMethod}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Try Another Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaPushChallengePushScreen;