import React from 'react';
import { usePasskeyEnrollment} from '@auth0/auth0-acul-react/passkey-enrollment';

const PasskeyEnrollmentScreen: React.FC = () => {
  const passkeyEnrollment = usePasskeyEnrollment();
  const { screen, transaction } = passkeyEnrollment;
  const texts = screen?.texts ?? {};

  const handleCreatePasskey = async () => {
    try {
      await passkeyEnrollment.continuePasskeyEnrollment();
    } catch (error) {
      console.error('Failed to create passkey:', error);
    }
  };

  const handleSkipPasskey = async () => {
    try {
      await passkeyEnrollment.abortPasskeyEnrollment();
    } catch (error) {
      console.error('Failed to skip passkey enrollment:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Create a passkey'}
        </h2>

        <p className="text-sm text-gray-700 mb-6 text-center">
          {texts.description ?? 'Use a passkey to securely log in to your account.'}
        </p>

        {transaction?.errors?.length && (
          <div className="mb-4 space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={index} className="text-red-600 text-sm text-center">
                {err.message}
              </p>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleCreatePasskey}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline"
        >
          {texts.createButtonText ?? 'Create a passkey'}
        </button>

        <button
          type="button"
          onClick={handleSkipPasskey}
          className="w-full text-blue-600 hover:underline text-sm"
        >
          {texts.continueButtonText ?? 'Continue without passkeys'}
        </button>
      </div>
    </div>
  );
};

export default PasskeyEnrollmentScreen;
