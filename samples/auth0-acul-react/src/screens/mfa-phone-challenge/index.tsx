import React, { useState } from 'react';
import { useMfaPhoneChallenge, continueMethod, tryAnotherMethod, pickPhone } from '@auth0/auth0-acul-react/mfa-phone-challenge';
import { Logo } from '../../components/Logo';

const MfaPhoneChallengeScreen: React.FC = () => {
  const mfaPhoneChallenge = useMfaPhoneChallenge();
  const { screen, transaction } = mfaPhoneChallenge;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const texts = screen?.texts ?? {};
  const title = texts.title ?? 'Verify Your Identity';
  const description = texts.description ?? `Choose how to receive the verification code for ${screen.data?.phoneNumber ?? 'your phone'}`;
  const smsButtonText = texts.smsButtonText ?? 'Send code via SMS';
  const voiceButtonText = texts.voiceButtonText ?? 'Send code via Voice Call';
  const tryAnotherMethodText = texts.pickAuthenticatorText ?? 'Try Another Method';
  const pickPhoneText = texts.pickPhoneText ?? 'Use a different phone number';

  const handleContinue = async (type: 'sms' | 'voice') => {
    setIsLoading(true);
    setError(null);
    try {
      await continueMethod({ type });
    } catch (err: any) {
      setError(err.message || 'Failed to send code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await tryAnotherMethod();
    } catch (err: any) {
      setError(err.message || 'Failed to switch methods. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePickPhone = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await pickPhone();
    } catch (err: any) {
      setError(err.message || 'Failed to switch phone number.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>

        {transaction.errors && transaction.errors.length > 0 && (
          <div className="mt-4 text-red-600 text-sm space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={`tx-error-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={() => handleContinue('sms')}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Processing…' : smsButtonText}
          </button>

          <button
            onClick={() => handleContinue('voice')}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Processing…' : voiceButtonText}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Processing…' : tryAnotherMethodText}
          </button>

          <button
            onClick={handlePickPhone}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Processing…' : pickPhoneText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaPhoneChallengeScreen;