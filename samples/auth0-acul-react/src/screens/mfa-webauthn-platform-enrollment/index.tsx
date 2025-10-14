import React from 'react';
import {
  useScreen,
  useTransaction,
  submitPasskeyCredential,
  snoozeEnrollment,
  refuseEnrollmentOnThisDevice,
} from '@auth0/auth0-acul-react/mfa-webauthn-platform-enrollment';
import { Logo } from '../../components/Logo';

const MfaWebAuthnPlatformEnrollmentScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const texts = screen?.texts ?? {};
  const publicKeyCreationOptions = screen?.publicKey;

  const handleEnrollPasskey = () => {
    submitPasskeyCredential();
  };

  const handleSnooze = () => {
    snoozeEnrollment();
  };

  const handleRefuse = () => {
    refuseEnrollmentOnThisDevice();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {texts.title ?? 'Set up Passkey'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {texts.description ?? 'Secure your account by adding a passkey.'}
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleEnrollPasskey}
            disabled={!publicKeyCreationOptions}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              !publicKeyCreationOptions ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {texts.buttonText ?? 'Enroll Passkey'}
          </button>

          <button
            onClick={handleSnooze}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>

          <button
            onClick={handleRefuse}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.refuseEnrollmentButtonText ?? 'Not on This Device'}
          </button>
        </div>

        {/* Errors */}
        {transaction?.hasErrors && Array.isArray(transaction.errors) && transaction.errors.length > 0 && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.map((error, index) => (
              <p key={index}>{error?.message}</p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MfaWebAuthnPlatformEnrollmentScreen;
