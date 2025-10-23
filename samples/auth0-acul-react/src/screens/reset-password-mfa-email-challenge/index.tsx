import React, { useState } from 'react';
import { useResetPasswordMfaEmailChallenge, continueMethod, resendCode, tryAnotherMethod } from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaEmailChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');

  const resetPasswordMfaEmailChallenge = useResetPasswordMfaEmailChallenge();
  const { screen, transaction } = resetPasswordMfaEmailChallenge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await continueMethod({
      code
    });
  };

  const handleResendCode = async () => {
    await resendCode();
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center"><div className="w-20 h-20"><Logo /></div></div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen?.texts?.title ?? 'Verify Your Identity'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {(screen?.texts?.description ?? "We've sent an email with your code to ") + (screen.data?.email || '')}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              {screen?.texts?.placeholder ?? 'Enter the code'}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder={screen?.texts?.placeholder ?? 'Enter the code'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {transaction?.errors?.length ? (
              <div className="mt-2 space-y-1" aria-live="polite">
                {transaction.errors.map((err, index) => (
                  <p key={index} className="text-red-600 text-xs">{err.message}</p>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify Code
          </button>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleResendCode}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            type="button"
          >
            Resend Code
          </button>
          <button
            onClick={handleTryAnotherMethod}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            type="button"
          >
            {screen?.texts?.pickAuthenticatorText ?? 'Try another method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaEmailChallengeScreen;