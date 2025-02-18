import React from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const MfaPushWelcomeScreen: React.FC = () => {
  const mfaPushWelcome = new MfaPushWelcome();
  const { screen } = mfaPushWelcome;

  const handleEnroll = async () => {
    try {
      await mfaPushWelcome.enroll();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  const handlePickAuthenticator = async () => {
    try {
      await mfaPushWelcome.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{ screen.texts?.title ?? 'Secure Your Account' }</h2>
        <p className="mb-4">{ screen.texts?.description ?? 'In order to continue, install the Auth0 Guardian app via the app store from your mobile device.' }</p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleEnroll}
          >
            { screen.texts?.buttonText ?? 'Continue' }
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handlePickAuthenticator}
          >
            { screen.texts?.pickAuthenticatorText ?? 'Try Another Method' }
          </button>
        </div>

        <div className="mt-5 space-between text-blue-600 hover:text-blue-800 hover:underline transition">
          {screen.links?.ios && (
            <p>
              <a href={screen.links?.ios}> Download iOS App</a>
            </p>
          )}
          {screen.links?.android && (
            <p>
              <a className="text-blue-600 hover:text-blue-800 hover:underline transition" href={screen.links?.android}>Download Android App</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MfaPushWelcomeScreen;