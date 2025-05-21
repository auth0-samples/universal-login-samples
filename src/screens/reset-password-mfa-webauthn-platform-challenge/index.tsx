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

  const [isLoading, setIsLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = useCallback(async () => {
    if (!publicKeyChallengeOptions) {
      setUiError("Cannot verify: WebAuthn challenge options are missing.");
      setIsLoading(false); // Ensure loading is false if we can't proceed
      return;
    }

    setIsLoading(true);
    setUiError(null);

    try {
      // The SDK's continueWithPasskey method now internally handles navigator.credentials.get()
      const opts: ContinueWithPasskeyOptions = {};
      if (showRememberDevice) {
        opts.rememberDevice = rememberDevice;
      }
      await sdk.continueWithPasskey(opts);
      // On successful verification, Auth0 typically handles redirection.
    } catch (err: any) {
      setIsLoading(false);
      // Handle WebAuthn API specific errors by reporting them
      if (err instanceof DOMException && err.name && err.message) {
        setUiError(`Verification failed: ${err.message}. Reporting error to Auth0...`);
        try {
          await sdk.reportBrowserError({ error: { name: err.name, message: err.message } });
        } catch (reportError: any) {
          setUiError(`Verification failed: ${err.message}. Also, failed to report error to Auth0: ${reportError.message}`);
        }
      } else {
        // Handle other errors (e.g., SDK internal errors, FormHandler errors)
        setUiError(`Verification process failed: ${err.message || 'Please try again.'}`);
      }
    }
    // setIsLoading(false) might not be reached if redirection occurs or if an error reporting also redirects.
  }, [sdk, publicKeyChallengeOptions, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(async () => {
    setIsLoading(true);
    setUiError(null);
    try {
      const opts: TryAnotherMethodOptions = {}; // Add custom options if needed
      await sdk.tryAnotherMethod(opts);
    } catch (err: any) {
      setIsLoading(false);
      setUiError(`Could not switch methods: ${err.message || 'Please try again.'}`);
    }
  }, [sdk]);

  // Effect to automatically trigger verification if publicKeyChallengeOptions are available.
  // This provides a more seamless UX, prompting the user immediately.
  useEffect(() => {
    if (publicKeyChallengeOptions && !isLoading) { // Check !isLoading to prevent re-triggering if already in process
      console.log("WebAuthn platform challenge options available. Automatically attempting verification.");
      handleVerify();
    } else if(!publicKeyChallengeOptions && !isLoading) {
      setUiError("WebAuthn challenge options are not available. Cannot proceed with platform authenticator.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKeyChallengeOptions]); // Dependency on publicKeyChallengeOptions ensures it runs when they become available.

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

        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">{texts.verifyingText ?? 'Verifying with your device...'}</p>
          </div>
        )}

        {transaction.errors && transaction.errors.length > 0 && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {uiError && !isLoading && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{uiError}</span>
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
              disabled={isLoading}
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
                disabled={isLoading || !publicKeyChallengeOptions}
                className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (texts.verifyingText ?? 'Verifying...') : (texts.retryButtonText ?? 'Retry Verification')}
              </button>
          )}

          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
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