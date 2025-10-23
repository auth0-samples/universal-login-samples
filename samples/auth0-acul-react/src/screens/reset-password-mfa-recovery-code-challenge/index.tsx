import React, { useState } from 'react';
import { useResetPasswordMfaRecoveryCodeChallenge, tryAnotherMethod } from '@auth0/auth0-acul-react/reset-password-mfa-recovery-code-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaRecoveryCodeChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const resetPasswordMfaRecoveryCodeChallengeManager = useResetPasswordMfaRecoveryCodeChallenge();
  const { screen, transaction: { errors } } = resetPasswordMfaRecoveryCodeChallengeManager;
  const texts = screen.texts ?? {};

  const handleSubmit = async () => {
    try {
      await resetPasswordMfaRecoveryCodeChallengeManager.continue(code);
    } catch (error) {
      console.error('Failed to submit recovery code:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await tryAnotherMethod();
    } catch (error) {
      console.error('Failed to try another method:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Enter Recovery Code'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'Please enter the recovery code from your authenticator app.'}
        </p>
        {/* Input */}
        <div className="mt-6">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            {texts.placeholder ?? 'Enter your recovery code'}
          </label>
          <input
            id="code"
            type="text"
            placeholder={texts.placeholder ?? 'Enter your recovery code'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors?.length ? (
            <div className="mt-2 space-y-1" aria-live="polite">
              {errors.map((err, index) => (
                <p key={index} className="text-red-600 text-xs">
                  {err.message}
                </p>
              ))}
            </div>
          ) : null}
        </div>
        {/* Continue Button */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleSubmit}
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.buttonText ?? 'Continue'}
          </button>
          <button
            onClick={handleTryAnotherMethod}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.pickAuthenticatorText ?? 'Try another method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaRecoveryCodeChallengeScreen;
