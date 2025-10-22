import React, { useCallback, useState } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import { Logo } from '../../components/Logo';

const MfaPushWelcomeScreen: React.FC = () => {
  const [mfaPushWelcome] = useState(() => new MfaPushWelcome());
  const { screen } = mfaPushWelcome;

  /** Handle Enroll */
  const handleEnroll = useCallback(async () => {
    try {
      await mfaPushWelcome.enroll();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  }, []);

  /** Handle Pick Authenticator */
  const handlePickAuthenticator = useCallback(async () => {
    try {
      await mfaPushWelcome.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  }, []);

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />
      
      {/* Title */}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1>{screen.texts?.title ?? 'Secure Your Account'}</h1>
        <p>
          {screen.texts?.description ??
            'In order to continue, install the Auth0 Guardian app via the app store from your mobile device.'}
        </p>
      </div>

      {/* App Store Buttons */}
      {(screen.links?.ios || screen.links?.android) && (
        <div className="input-container">
          <div className="flex gap-4 mb-4 justify-center">
            {screen.links?.ios && (
              <a 
                href={screen.links.ios} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center py-6 px-4 border border-gray-300 rounded-lg no-underline text-gray-800 text-base font-medium gap-2 bg-white hover:bg-gray-50 transition-all"
              >
                <span className="text-4xl">🍎</span>
                App Store
              </a>
            )}
            {screen.links?.android && (
              <a 
                href={screen.links.android} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center py-6 px-4 border border-gray-300 rounded-lg no-underline text-gray-800 text-base font-medium gap-2 bg-white hover:bg-gray-50 transition-all"
              >
                <span className="text-4xl">📱</span>
                Google Play
              </a>
            )}
          </div>

          {/* Continue Button */}
          <div className="button-container">
            <button type="button" onClick={handleEnroll}>
              {screen.texts?.buttonText ?? 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* Try Another Method Link */}
      <div className="links">
        <a href="#" onClick={(e) => { e.preventDefault(); handlePickAuthenticator(); }}>
          {screen.texts?.pickAuthenticatorText ?? 'Try another method'}
        </a>
      </div>

      {/* Error Messages */}
      {mfaPushWelcome.transaction.hasErrors && mfaPushWelcome.transaction.errors && (
        <div className="error-container">
          {mfaPushWelcome.transaction.errors.map((error: any, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MfaPushWelcomeScreen;
