import React from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

const ResetPasswordMfaPushChallengePushScreen: React.FC = () => {
  const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
  const { deviceName } = resetPasswordMfaPushChallengePush.screen.data || {};
  const { screen, transaction } = resetPasswordMfaPushChallengePush


  const handleContinue = async () => {
    await resetPasswordMfaPushChallengePush.continue();
  };

  const handleResend = async () => {
    await resetPasswordMfaPushChallengePush.resendPushNotification();
  };

  const handleEnterCodeManually = async () => {
    await resetPasswordMfaPushChallengePush.enterCodeManually();
  };

  const handleTryAnotherMethod = async () => {
    await resetPasswordMfaPushChallengePush.tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          { screen?.texts?.title ?? 'Verify Your Identity' }
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          { screen?.texts?.description ?? 'We\'ve sent a notification to the following device via Auth0 Guardian app.'  + `Device: ${screen.data?.deviceName}` }
          {deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-500">
              Waiting for you to accept the push notification...
            </p>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>

            <button
              onClick={handleContinue}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              { screen?.texts?.continueTextB2C ?? 'I\'ve responded on my device' }
            </button>            

            <button
              onClick={handleResend}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              { screen?.texts?.resendActionText ?? 'Resend Code Manually' }
            </button>

            <button
              onClick={handleEnterCodeManually}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
              { screen?.texts?.enterOtpCode ?? 'Enter Code Manually' }
            </button>

            <button
              onClick={handleTryAnotherMethod}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
              { screen?.texts?.tryAnotherMethod ?? 'Try Another Method' }
            </button>
          </div>

          {transaction?.errors?.length && (
            <div className="mt-2 mb-4">
              {transaction?.errors.map((err, index) => (
                <p key={index} className="text-red-500">
                  {err.message}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaPushChallengePushScreen;