import React, { useState } from 'react';
import { useResetPasswordMfaVoiceChallenge, continueMethod, switchToSms, tryAnotherMethod, useResend} from '@auth0/auth0-acul-react/reset-password-mfa-voice-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaVoiceChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [showLinkSms, setShowLinkSms] = useState(false);
  const resetPasswordMfaVoiceChallenge = useResetPasswordMfaVoiceChallenge();
  const { screen, transaction } = resetPasswordMfaVoiceChallenge;
  const texts = screen?.texts ?? {};
  const { remaining, disabled, startResend } = useResend({ timeoutSeconds: 12 });

  // Initialize state from screen data
  React.useEffect(() => {
    if (screen?.data?.showLinkSms !== undefined) {
      setShowLinkSms(screen.data.showLinkSms);
    }
  }, [screen?.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await continueMethod({ code });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleSwitchToSms = async () => {
    try {
      await switchToSms();
    } catch (error) {
      console.error('Switch to SMS failed:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await startResend();
    } catch (error) {
      console.error('Resend code failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">{/* unified background */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">{/* card layout */}
        {/* Logo */}
        <div className="flex justify-center mb-2"><div className="w-20 h-20"><Logo /></div></div>
        <h2 className="text-center text-xl font-semibold text-gray-900">{texts.title ?? 'Verify Your Identity'}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{texts.description ?? `Enter the code sent to ${(screen?.data?.phoneNumber || 'your phone')}`}</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">{/* existing form logic */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">{texts.placeholder ?? 'Enter your code'}</label>
            <input id="code" name="code" type="text" required placeholder={texts.placeholder ?? 'Enter your code'} value={code} onChange={(e) => setCode(e.target.value)} className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {transaction?.errors?.length && (<div className="mt-2 space-y-1" aria-live="polite">{transaction.errors.map((err, index) => (<p key={index} className="text-red-600 text-xs">{err.message}</p>))}</div>)}
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{texts.buttonText ?? 'Verify Code'}</button>
        </form>
        <div className="mt-6 space-y-3 text-center">{/* action links */}
          <button onClick={handleResendCode} disabled={disabled} type="button" className={`w-full flex justify-center py-2 px-4 rounded-md border text-sm font-medium ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}>{disabled ? `${texts.resendDisabledText || 'Resend in'} ${remaining}s` : (texts.resendActionText ?? 'Call Again')}</button>
          {showLinkSms && (<button onClick={handleSwitchToSms} type="button" className="w-full flex justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">{texts.resendSmsActionText ?? 'Send a text'}</button>)}
          <button onClick={handleTryAnotherMethod} type="button" className="w-full flex justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">{texts.pickAuthenticatorText ?? 'Try another method'}</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaVoiceChallengeScreen;
