import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import {
  submitPhoneChallenge,
  switchToVoice,
  switchToText,
  useResend,
  useScreen,
  useErrors
} from '@auth0/auth0-acul-react/phone-identifier-challenge';

const PhoneIdentifierChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [returned, setReturned] = useState(false);
  const screen = useScreen();

  const { disabled, startResend } = useResend({ timeoutSeconds: 10 });

  const { hasError, errors } = useErrors();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    if (!code) {
      setError('Code is required.');
      return;
    }
    try {
      await submitPhoneChallenge({ code });
      setSuccess(true);
    } catch {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResend = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {

      startResend(); // Start the resend timer
    } catch {
      setError('Failed to resend code. Please try again later.');
    }
  };

  const handleReturn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {
      await (screen.data?.showLinkVoice ? switchToVoice() : switchToText());
      setReturned(true);
    } catch {
      setError('Failed to return to previous step. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || "Verify Your Identity"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || `We have sent a text message to ${screen.data?.phone}`}
        </p>
        <div className="mt-6 space-y-6">
          <form onSubmit={handleSubmit}>
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleResend}>
            <div className="text-sm text-gray-600 text-center">
              <span>Didn't receive a code?</span>
              <button
                type="button"
                onClick={handleResend}
                className="ml-2 font-medium text-blue-600 hover:text-blue-500"
              >
                Resend
              </button>
              <span className="mx-2">or</span>
              <button
                type="button"
                onClick={handleReturn}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {screen.data?.showLinkVoice ? "get a call" : "send a text"}
              </button>
            </div>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Challenge submitted successfully!</div>}
          {returned && <div className="text-blue-600 text-sm mt-2">Returned to previous step.</div>}

          {
            hasError && errors.map((error, i) => (
              <p key={i} className="mt-2 text-red-600 text-center text-sm">{error.message}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneIdentifierChallengeScreen;