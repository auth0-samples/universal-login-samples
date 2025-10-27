import React, { useState } from 'react';
import { useEmailOTPChallenge, submitCode, useResend } from '@auth0/auth0-acul-react/email-otp-challenge';
import { Logo } from '../../components/Logo';

const EmailOTPChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const emailOTPChallengeManager = useEmailOTPChallenge();
  const { disabled, remaining, startResend } = useResend();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await submitCode({ code });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess(false);
    try {
      await startResend();
    } catch (err: any) {
      setError(err.message || 'Failed to resend code. Please try again.');
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
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Email OTP Challenge</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Enter the verification code sent to your email.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Code
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs text-gray-400">Need a new code?</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Resend */}
        <button
          type="button"
          onClick={handleResendCode}
          disabled={disabled}
          className={`w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${disabled ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
        >
          {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
        </button>

        {/* Messages */}
        <div className="mt-4 min-h-[20px]" aria-live="polite">
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          {success && !error && <p className="text-xs text-green-600 text-center">Code submitted successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default EmailOTPChallengeScreen;