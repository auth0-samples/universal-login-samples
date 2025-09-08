import React, { useState, useMemo, useCallback } from 'react';
import ResetPasswordMfaWebAuthnRoamingChallenge, {
  type UseSecurityKeyOptions,
  type TryAnotherMethodOptions,
  type WebAuthnErrorDetails,
  type ResetPasswordMfaWebAuthnRoamingChallengeMembers
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const ResetPasswordMfaWebAuthnRoamingChallengeComponent: React.FC = () => {
  // Instantiate the SDK class. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new ResetPasswordMfaWebAuthnRoamingChallenge(), []);

  const { screen, transaction, client, organization }: ResetPasswordMfaWebAuthnRoamingChallengeMembers = sdk;
  const texts = screen?.texts ?? {};
  const publicKeyChallenge = screen?.publicKey?.challenge; // Challenge string for WebAuthn API

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleUseSecurityKey = useCallback(async () => {
    const opts: UseSecurityKeyOptions = {};
    if (sdk.screen.showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.useSecurityKey(opts);
  }, [sdk, rememberDevice]);

  const handleTryAnotherMethod = useCallback(async () => {
    const opts: TryAnotherMethodOptions = {};
    if (sdk.screen.showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.tryAnotherMethod(opts);
  }, [sdk, rememberDevice]);

  // Example: Simulate a client-side error to demonstrate showError
  const handleSimulateWebAuthnError = async () => {
    const simulatedError: WebAuthnErrorDetails = {
      name: "NotSupportedError",
      message: "The browser does not support the requested WebAuthn operation on this device (simulated)."
    };
    sdk.showError({ error: simulatedError, rememberDevice: sdk.screen.showRememberDevice && rememberDevice });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client?.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify with Security Key'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please insert your security key and follow the browser prompts to continue resetting your password.'}
          </p>
          {organization?.name && (
            <p className="mt-1 text-sm text-gray-500">
              Organization: {organization.displayName || organization.name}
            </p>
          )}
           {publicKeyChallenge && (
            <p className="mt-1 text-xs text-gray-400 break-all">
              Challenge: {typeof publicKeyChallenge === 'string' ? publicKeyChallenge : JSON.stringify(publicKeyChallenge)}
            </p>
          )}
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction?.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Remember device checkbox */}
        {sdk.screen.showRememberDevice && (
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
            onClick={handleUseSecurityKey}
            disabled={!publicKeyChallenge}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {(texts.buttonText ?? 'Use Security Key')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>

          <button
            onClick={handleSimulateWebAuthnError}
            className="w-full flex justify-center px-4 py-2.5 border border-amber-500 rounded-md shadow-sm text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.simulateErrorButtonText ?? 'Simulate WebAuthn Error & Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaWebAuthnRoamingChallengeComponent;