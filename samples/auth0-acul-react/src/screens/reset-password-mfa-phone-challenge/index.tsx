import React, { useState } from 'react';
import { useResetPasswordMfaPhoneChallenge, continueMethod, tryAnotherMethod } from '@auth0/auth0-acul-react/reset-password-mfa-phone-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaPhoneChallengeScreen: React.FC = () => {
  // Instantiate the SDK class for the screen
  const screenManager = useResetPasswordMfaPhoneChallenge();
  const { screen, transaction } = screenManager;

  // State to manage loading indicators and potential errors
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // State to track the user's choice (needed for tryAnotherMethod)
  // Default to 'sms' or 'voice' based on initial view, or let user select first
  const [currentChallengeType, setCurrentChallengeType] = useState<'sms' | 'voice'>('sms'); // Example default

  /**
   * Handles the action when the user chooses SMS or Voice Call.
   * @param {'sms' | 'voice'} type - The selected delivery method.
   */
  const handleContinue = async (type: 'sms' | 'voice') => {
    setIsLoading(true);
    setError(null);
    setCurrentChallengeType(type); // Update the current type
    try {
      await continueMethod({ type });
      // On success, Auth0 usually handles the redirect to the next step (code entry).
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to send verification code. Please try again.');
      } else {
        setError('Failed to send verification code. Please try again.');
      }
      setIsLoading(false); // Only stop loading on error
    }
  };

  /**
   * Handles the action when the user wants to try a different MFA method.
   */
  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Pass the current challenge type the user was viewing
      await tryAnotherMethod({ type: currentChallengeType });
      // On success, Auth0 usually handles the redirect to the authenticator selection screen.
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to switch MFA methods. Please try again.');
      } else {
        setError('Failed to switch MFA methods. Please try again.');
      }
      setIsLoading(false); // Only stop loading on error
    }
  };

  // Extract texts for UI elements, providing default fallbacks
  const texts = screen?.texts ?? {};
  const title = texts.title ?? 'Verify Your Identity';
  // Example: Modify description to include phone number securely
  const description = texts.description ?? `Choose how to receive the verification code sent to ${screen.data?.phoneNumber ?? 'your phone'}.`;
  const smsButtonText = texts.smsButtonText ?? 'Send code via SMS';
  const voiceButtonText = texts.voiceButtonText ?? 'Send code via Voice Call';
  const tryAnotherMethodText = texts.pickAuthenticatorText ?? 'Try Another Method'; // Assuming this text key exists

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center"><div className="w-20 h-20"><Logo /></div></div>
        {/* Title */}
        <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>
        {/* Errors */}
        {transaction.errors?.length ? (
          <div className="mt-4 space-y-1" aria-live="polite">
            {transaction.errors.map((err, i) => (<p key={i} className="text-red-600 text-xs text-center">{err.message}</p>))}
          </div>
        ) : null}
        {error && (
          <div className="mt-4" aria-live="polite">
            <p className="text-red-600 text-xs text-center">{error}</p>
          </div>
        )}
        {/* Actions */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => handleContinue('sms')}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isLoading && currentChallengeType === 'sms' ? 'Sending SMS...' : smsButtonText}
          </button>
          <button
            onClick={() => handleContinue('voice')}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isLoading && currentChallengeType === 'voice' ? 'Initiating Call...' : voiceButtonText}
          </button>
          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            {isLoading ? 'Loading...' : tryAnotherMethodText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaPhoneChallengeScreen;