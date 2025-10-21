import React, { useCallback } from 'react';
import { useMfaWebAuthnRoamingEnrollment } from '@auth0/auth0-acul-react/mfa-webauthn-roaming-enrollment';
import { Logo } from '../../components/Logo';

const MfaWebAuthnRoamingEnrollmentScreen: React.FC = () => {
  const webauthnEnrollmentManager = useMfaWebAuthnRoamingEnrollment();
  const { screen, transaction } = webauthnEnrollmentManager;

  const handleEnroll = useCallback(() => {
    webauthnEnrollmentManager.enroll({});
  }, [webauthnEnrollmentManager]);

  const handleShowError = useCallback(async (errorDetails: { name: string; message: string }) => {
    webauthnEnrollmentManager.showError({ error: errorDetails });
  }, [webauthnEnrollmentManager]);

  const handleTryAnotherMethod = useCallback(async () => {
    webauthnEnrollmentManager.tryAnotherMethod();
  }, [webauthnEnrollmentManager]);

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
          {screen.texts?.title ?? 'Enroll Security Key'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description ?? 'Enroll your security key to enhance your account security.'}
        </p>

        {/* Error Messages */}
        {transaction?.errors && transaction.errors.length > 0 && (
          <div className="mt-4 space-y-1">
            {transaction.errors.map((err: any, index: number) => (
              <p key={index} className="text-red-600 text-sm text-center">
                {err.message}
              </p>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleEnroll}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.buttonText ?? 'Enroll Security Key'}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.tryAnotherMethodText ?? 'Try Another Method'}
          </button>

          {/* Example of how you might trigger showError from a specific UI element or catch block */}
          <button
            onClick={() => handleShowError({ name: 'UserCancelled', message: 'User cancelled the WebAuthn prompt.' })}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Report WebAuthn Error (Example)
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnRoamingEnrollmentScreen;