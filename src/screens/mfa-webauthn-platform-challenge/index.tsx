import React, { useState, useMemo, useCallback, useEffect } from 'react';
import MfaWebAuthnPlatformChallenge, {
  type VerifyPlatformAuthenticatorOptions} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge'; // Adjust path as necessary

const MfaWebAuthnPlatformChallengeScreen: React.FC = () => {
  // Instantiate the SDK class. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnPlatformChallenge(), []);

  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const { publicKey: publicKeyChallengeOptions, showRememberDevice } = screen;

  const [isLoading, setIsLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const [rememberDevice, setRememberDevice] = useState(false);

  // Effect to automatically trigger verification if publicKeyChallengeOptions are available
  useEffect(() => {
    if (publicKeyChallengeOptions) {
      // Optionally, you could auto-trigger verification here,
      // or wait for user interaction (e.g., clicking a button).
      // For this example, we'll assume a button click.
      console.log("WebAuthn platform challenge options available. Ready for user to verify.");
    } else {
      setUiError("WebAuthn challenge options are not available. Cannot proceed with platform authenticator.");
    }
  }, [publicKeyChallengeOptions]);

  const handleVerify = useCallback(async () => {
    if (!publicKeyChallengeOptions) {
      setUiError("Cannot verify: WebAuthn challenge options are missing.");
      return;
    }

    setIsLoading(true);
    setUiError(null);
    try {
      const opts: VerifyPlatformAuthenticatorOptions = {};
      if (showRememberDevice) {
        opts.rememberDevice = rememberDevice;
      }
      await sdk.verify(opts);
      // On successful verification, Auth0 typically handles redirection.
      // setIsLoading(false) might not be reached if redirection occurs immediately.
    } catch (err: any) {
      setIsLoading(false);
      // Handle WebAuthn API specific errors by reporting them
      if (err.name && (err.name === 'NotAllowedError' || err.name === 'NotFoundError' || err.name === 'NotSupportedError' || err.message?.includes('timeout'))) {
        setUiError(`Verification failed: ${err.message}. Reporting error...`);
        try {
          await sdk.reportBrowserError({ error: { name: err.name, message: err.message } });
          // After reporting, Auth0 might redirect or the page might show new transaction errors.
        } catch (reportError: any) {
          setUiError(`Verification failed: ${err.message}. Also, failed to report error: ${reportError.message}`);
        }
      } else {
        // Handle other errors (e.g., network issues, SDK internal errors)
        setUiError(`Verification process failed: ${err.message || 'Please try again.'}`);
      }
    }
  }, [sdk, publicKeyChallengeOptions, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(async () => {
    setIsLoading(true);
    setUiError(null);
    try {
      await sdk.tryAnotherMethod();
      // Auth0 handles redirection to the MFA factor selection screen.
    } catch (err: any) {
      setIsLoading(false);
      setUiError(`Could not switch methods: ${err.message}`);
    }
  }, [sdk]);

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
            {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue.'}
          </p>
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Display UI-specific errors */}
        {uiError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{uiError}</span>
          </div>
        )}

        {/* Remember device checkbox */}
        {showRememberDevice && (
          <div className="flex items-center justify-center">
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
            onClick={handleVerify}
            disabled={isLoading || !publicKeyChallengeOptions}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (texts.buttonText ?? 'Verify with Device')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnPlatformChallengeScreen;