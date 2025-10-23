import React, { useState } from 'react';
import { useResetPasswordMfaOtpChallenge, continueMethod, tryAnotherMethod } from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaOtpChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const resetPasswordMfaOtpChallenge = useResetPasswordMfaOtpChallenge();
  const { screen, transaction } = resetPasswordMfaOtpChallenge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await continueMethod({ code });
  };

  const handleTryAnotherMethod = async () => { await tryAnotherMethod(); };

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
          {screen?.texts?.description ?? 'Check your preferred one-time password authenticator app for the code.'}
        </p>
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              {screen?.texts?.placeholder ?? 'Enter your one-time code'}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder={screen?.texts?.placeholder ?? 'Enter your one-time code'}
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
        {/* Try another method */}
        <div className="mt-6">
          <button
            onClick={handleTryAnotherMethod}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try another method
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaOtpChallengeScreen;