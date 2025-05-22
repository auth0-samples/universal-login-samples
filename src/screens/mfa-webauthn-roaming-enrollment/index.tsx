import React, { useCallback } from 'react';
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

const MfaWebAuthnRoamingEnrollmentScreen: React.FC = () => {

  const webauthnEnrollmentManager = new MfaWebAuthnRoamingEnrollment();
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {screen.texts?.title ?? 'Enroll Security Key'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {screen.texts?.description ?? 'Enroll your security key to enhance your account security.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          {transaction?.errors?.length && ( // Display transaction errors if any
              <div className="mt-2 mb-4">
                {transaction?.errors.map((err, index) => (
                  <p key={index} className="text-red-500">
                    {err.message}
                  </p>
                ))}
              </div>
            )}

          <div className="space-y-4">
            <button
              onClick={handleEnroll}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screen.texts?.buttonText ?? 'Enroll Security Key'}
            </button>

            <button
              onClick={handleTryAnotherMethod}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screen.texts?.tryAnotherMethodText ?? 'Try Another Method'}
            </button>

             {/* Example of how you might trigger showError from a specific UI element or catch block */}
             <button
              onClick={() => handleShowError({ name: 'UserCancelled', message: 'User cancelled the WebAuthn prompt.' })}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Report WebAuthn Error (Example)
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnRoamingEnrollmentScreen;