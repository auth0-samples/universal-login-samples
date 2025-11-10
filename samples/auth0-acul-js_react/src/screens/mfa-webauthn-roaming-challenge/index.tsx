import React, { useState, useMemo, useCallback } from 'react';
import MfaWebAuthnRoamingChallenge, {
  type VerifySecurityKeyOptions
} from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

const MfaWebAuthnRoamingChallengeScreen: React.FC = () => {
  // Instantiate the SDK class. It's memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnRoamingChallenge(), []);

  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};

  const [rememberDevice, setRememberDevice] = useState(false);

  // Callback to handle the primary verification action
  const handleVerifyWithSecurityKey = useCallback(() => {
    const opts: VerifySecurityKeyOptions = {};
    if (screen?.data?.showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.verify(opts);
  }, [sdk, rememberDevice, screen?.data?.showRememberDevice]);

  // Callback for trying another MFA method
  const handleTryAnotherMethod = useCallback(() => {
    sdk.tryAnotherMethod();
  }, [sdk]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-center">
          {/* You can add an icon here, e.g., a security key icon */}
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify with Security Key'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please insert your security key and follow the browser prompts to continue.'}
          </p>
          {screen?.data?.webAuthnType && (
            <p className="mt-1 text-sm text-gray-500">
              (Authenticator type: {screen.data.webAuthnType})
            </p>
          )}
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Remember device checkbox */}
        {screen?.data?.showRememberDevice && (
          <div className="flex items-center">
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

        <div className="space-y-4">
          <button
            onClick={handleVerifyWithSecurityKey}
            disabled={!screen?.publicKey}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {(texts.buttonText ?? 'Verify with Security Key')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnRoamingChallengeScreen;