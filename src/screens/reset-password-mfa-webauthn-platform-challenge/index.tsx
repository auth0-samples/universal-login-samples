import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ResetPasswordMfaWebAuthnPlatformChallenge, {
  type ContinueWithPasskeyOptions,
  type TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

const ResetPasswordMfaWebAuthnPlatformChallengeComponent: React.FC = () => {
  const sdk = useMemo(() => new ResetPasswordMfaWebAuthnPlatformChallenge(), []);
  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const { publicKey: publicKeyChallengeOptions, showRememberDevice } = screen;

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = useCallback(() => {
    const opts: ContinueWithPasskeyOptions = {};
      if (showRememberDevice) {
        opts.rememberDevice = rememberDevice;
      }
    sdk.continueWithPasskey(opts);
  }, [sdk, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(() => {
    const opts: TryAnotherMethodOptions = {}; // Add custom options if needed
    sdk.tryAnotherMethod(opts);
  }, [sdk]);

  // Effect to automatically trigger verification if publicKeyChallengeOptions are available.
  // This provides a more seamless UX, prompting the user immediately.
  useEffect(() => {
    if (publicKeyChallengeOptions) { // Check !isLoading to prevent re-triggering if already in process
      console.log("WebAuthn platform challenge options available. Automatically attempting verification.");
      handleVerify();
    }
  }, [handleVerify, publicKeyChallengeOptions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify Your Identity'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue resetting your password.'}
          </p>
        </div>

        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {showRememberDevice && (
          <div className="flex items-center justify-center mt-4">
            <input
              id="rememberDevice"
              name="rememberDevice"
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-900">
              {texts.rememberMeText ?? 'Remember this device for 30 days'}
            </label>
          </div>
        )}

        <div className="space-y-4 mt-6">
          {/* Button to manually trigger verification if auto-trigger fails or as a retry option */}
          {/* This might only be shown if publicKeyChallengeOptions exist but initial auto-verify failed */}
          {publicKeyChallengeOptions && (
             <button
                onClick={handleVerify}
                disabled={!publicKeyChallengeOptions}
                className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {(texts.retryButtonText ?? 'Retry Verification')}
              </button>
          )}

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaWebAuthnPlatformChallengeComponent;