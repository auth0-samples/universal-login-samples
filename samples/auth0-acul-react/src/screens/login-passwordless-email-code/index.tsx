import React, { useState } from 'react';
import { useScreen, submitCode, useResend } from '@auth0/auth0-acul-react/login-passwordless-email-code';
import { Logo } from '../../components/Logo';

const LoginPasswordlessEmailCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const screen = useScreen();
  const email = screen.data?.username || '';

  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 30,
    onTimeout: () => { },
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !code) {
      setError('Email and code are required.');
      return;
    }

    try {
      await submitCode({ email, code });
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid code or email. Please try again.';
      setError(errorMessage);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess(false);

    try {
      startResend(); // Start the countdown timer and trigger resend
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend code. Please try again later.';
      setError(errorMessage);
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
          Continue with Email Code
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter the code sent to {email || 'your email'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email (Read-only) */}
          {email && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  value={email}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 sm:text-sm cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {/* Code Input */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <div className="mt-1">
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the code"
              />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Login successful!</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>

          {/* Resend Button */}
          <div>
            <button
              type="button"
              onClick={handleResend}
              disabled={disabled}
              className={`w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPasswordlessEmailCodeScreen;