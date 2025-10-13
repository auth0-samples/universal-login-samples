import React, { useMemo, useCallback } from 'react';
import MfaWebAuthnEnrollmentSuccess, {
  type ContinueOptions
} from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { Logo } from '../../components/Logo';

const MfaWebAuthnEnrollmentSuccessScreen: React.FC = () => {
  const sdk = useMemo(() => new MfaWebAuthnEnrollmentSuccess(), []);

  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const screenData = screen.data;

  const authenticatorTypeFriendlyName = useMemo(() => {
    if (screenData?.webauthnType === 'webauthn-platform') {
      return texts.platformAuthenticatorName ?? 'Device Authenticator';
    }
    if (screenData?.webauthnType === 'webauthn-roaming') {
      return texts.roamingAuthenticatorName ?? 'Security Key';
    }
    return 'Authenticator';
  }, [screenData?.webauthnType, texts]);

  const handleContinue = useCallback(() => {
    const opts: ContinueOptions = {};
    sdk.continue(opts);
  }, [sdk]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="prompt-container">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} style={{ display: 'block', margin: '0 auto', height: '3rem', marginBottom: '1.5rem' }} />
        )}
      
      <Logo />
      
      <div className="title-container">
        <h1 style={{ textAlign: 'center' }}>{texts.title ?? 'Authenticator Added!'}</h1>
        {screenData ? (
          <>
            <p style={{ textAlign: 'center' }}>
              Your {authenticatorTypeFriendlyName} has been successfully added to your account.
            </p>
            <div className="input-container">
              <input
                type="text"
                value={screenData.nickname}
                readOnly
                disabled
                style={{ textAlign: 'center' }}
              />
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>
            {texts.descriptionGeneric ?? 'Your authenticator has been successfully added.'}
          </p>
        )}
      </div>

      <div className="input-container">
        <div className="button-container">
          <button onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>

      {transaction.errors && transaction.errors.length > 0 && (
        <div className="error-container">
          {transaction.errors.map((err, index) => (
            <p key={`tx-err-${index}`}>{err.message}</p>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MfaWebAuthnEnrollmentSuccessScreen;