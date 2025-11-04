import React, { useState, useMemo, useCallback } from 'react';
import MfaWebAuthnPlatformChallenge, {
  type VerifyPlatformAuthenticatorOptions
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
import { Logo } from '../../components/Logo';

const MfaWebAuthnPlatformChallengeScreen: React.FC = () => {
  const sdk = useMemo(() => new MfaWebAuthnPlatformChallenge(), []);

  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const { publicKey: publicKeyChallengeOptions } = screen;
  const { showRememberDevice } = screen.data ?? {};

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = useCallback(() => {
    const opts: VerifyPlatformAuthenticatorOptions = {};
    if (showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.verify(opts);
  }, [sdk, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(() => {
    sdk.tryAnotherMethod();
  }, [sdk]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="prompt-container">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} style={{ display: 'block', margin: '0 auto', height: '3rem', marginBottom: '1.5rem' }} />
        )}

        <Logo />

        <div className="title-container">
          <h1 style={{ textAlign: 'center' }}>
            {texts.title ?? 'Verify Your Identity'}
          </h1>
          <p style={{ textAlign: 'center' }}>
            {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue.'}
          </p>
        </div>

        {showRememberDevice && (
          <div className="input-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              id="rememberDevice"
              name="rememberDevice"
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              style={{ width: 'auto', marginRight: '0.5rem' }}
            />
            <label htmlFor="rememberDevice" style={{ margin: 0 }}>
              {texts.rememberMeText ?? 'Remember this device for 30 days'}
            </label>
          </div>
        )}

        <div className="input-container">
          <div className="button-container">
            <button
              onClick={handleVerify}
              disabled={!publicKeyChallengeOptions}
            >
              {texts.buttonText ?? 'Verify with Device'}
            </button>
          </div>

          <div className="button-container">
            <button onClick={handleTryAnotherMethod}>
              {texts.pickAuthenticatorText ?? 'Try Another Method'}
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

export default MfaWebAuthnPlatformChallengeScreen;