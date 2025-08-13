import React, { useState } from 'react';
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

const MfaWebAuthnPlatformEnrollmentScreen: React.FC = () => {
  const [sdk] = useState(() => new MfaWebAuthnPlatformEnrollment());
  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};
  const publicKeyCreationOptions = screen.publicKey;

  const handleEnrollPasskey = () => {
    sdk.submitPasskeyCredential(); 
  };

  const handleSnooze = () => {
    sdk.snoozeEnrollment();
  };

  const handleRefuse = () => {
    sdk.refuseEnrollmentOnThisDevice();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Set up Passkey'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Secure your account by adding a passkey. This lets you sign in with your device’s screen lock, like fingerprint or face ID.'}
          </p>
        </div>

        {transaction.errors && transaction.errors.length > 0 && (
           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4" role="alert">
             <p className="font-bold">{texts.alertListTitle ?? 'Alerts'}</p>
             {transaction.errors.map((err, index) => (
               <p key={index}>{err.message}</p>
             ))}
           </div>
         )}

        <div className="space-y-4">
          <button
            onClick={handleEnrollPasskey}
            disabled={!publicKeyCreationOptions} // Use the direct accessor
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(texts.buttonText ?? 'Enroll Passkey')}
          </button>

          <button
            onClick={handleSnooze}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>

          <button
            onClick={handleRefuse}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.refuseEnrollmentButtonText ?? 'Not on This Device'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnPlatformEnrollmentScreen;