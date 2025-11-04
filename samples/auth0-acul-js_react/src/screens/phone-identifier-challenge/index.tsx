import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const PhoneIdentifierChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);
  const [returned, setReturned] = useState(false);

  const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
  phoneIdentifierChallenge.screen.data?.showLinkSms
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);
    setReturned(false);
    if (!code) {
      setError('Code is required.');
      return;
    }
    try {
      await phoneIdentifierChallenge.submitPhoneChallenge({ code });
      setSuccess(true);
    } catch {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResend = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);
    setReturned(false);
    try {
      await phoneIdentifierChallenge.resendCode();
      setResent(true);
    } catch {
      setError('Failed to resend code. Please try again later.');
    }
  };

  const handleReturn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);
    setReturned(false);
    try {
      await (phoneIdentifierChallenge.screen.data?.showLinkVoice ? phoneIdentifierChallenge.switchToVoice() : phoneIdentifierChallenge.switchToText());
      setReturned(true);
    } catch {
      setError('Failed to return to previous step. Please try again later.');
    }
  };

  return (
    <div className="prompt-container">
      <Logo />
      <h1>{phoneIdentifierChallenge.screen.texts?.title || "Verify Your Identity"}</h1>
      <p>{phoneIdentifierChallenge.screen.texts?.description || `We have sent a text message to ${phoneIdentifierChallenge.screen.data?.phone}`}</p>
      <div className="input-container space-y-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              {phoneIdentifierChallenge.screen.data?.showLinkVoice ? "get a call" : "send a text"}
            </button>
          </div>
        </form>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">Challenge submitted successfully!</div>}
        {resent && <div className="text-blue-600 text-sm mt-2">Code resent to your phone.</div>}
        {returned && <div className="text-blue-600 text-sm mt-2">Returned to previous step.</div>}
      </div>
    </div>
  );
};

export default PhoneIdentifierChallengeScreen;