import React, { useState } from 'react';
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { Logo } from '../../components/Logo';

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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="prompt-container">
        <Logo />
      
      <div className="title-container">
        <h1 style={{ textAlign: 'center' }}>{texts.title ?? 'Set up Passkey'}</h1>
        <p style={{ textAlign: 'center' }}>{texts.description ?? 'Secure your account by adding a passkey.'}</p>
      </div>

      <div className="input-container">
        <div className="button-container">
          <button
            onClick={handleEnrollPasskey}
            disabled={!publicKeyCreationOptions}
          >
            {texts.buttonText ?? 'Enroll Passkey'}
          </button>
        </div>

        <div className="button-container">
          <button
            onClick={handleSnooze}
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>
        </div>

        <div className="button-container">
          <button
            onClick={handleRefuse}
          >
            {texts.refuseEnrollmentButtonText ?? 'Not on This Device'}
          </button>
        </div>
      </div>

      {transaction.hasErrors && transaction.errors && (
        <div className="error-container">
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