import React, { useState } from 'react';
import { useMfaOtpEnrollmentCode, continueMethod, tryAnotherMethod } from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';
import { Logo } from '../../components/Logo';

const MfaOtpEnrollmentCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const mfaOtpEnrollmentCode = useMfaOtpEnrollmentCode();
  const { screen, transaction } = mfaOtpEnrollmentCode;
  const texts = screen?.texts || {};

  const title = texts.title ?? 'Secure Your Account';
  const description = texts.description ?? 'Enter this secret into your authenticator app, then provide the generated one-time code below.';
  const otpSeed = screen.data?.text_code;
  const placeholder = texts.placeholder ?? 'Enter your one-time code';
  const tryAnother = texts.tryAnotherMethod ?? 'Try Another Method';
  const buttonText = texts.buttonText ?? 'Verify Code';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await continueMethod({ code });
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>

        {otpSeed && (
          <div className="mt-6">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Secret Code</p>
            <div className="w-full break-all select-all font-mono text-sm p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800">
              {otpSeed}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={placeholder}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {transaction?.errors?.length && (
            <div className="text-red-600 text-sm space-y-1">
              {transaction.errors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonText}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {tryAnother}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaOtpEnrollmentCodeScreen;