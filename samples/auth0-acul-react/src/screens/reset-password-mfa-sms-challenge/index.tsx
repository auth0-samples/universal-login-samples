import { useState } from 'react';
import { useResetPasswordMfaSmsChallenge, continueMfaSmsChallenge, tryAnotherMethod, useResend, getACall } from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaSmsChallengeScreen = () => {
  const resetPasswordMfaSmsChallenge = useResetPasswordMfaSmsChallenge();
  const [code, setCode] = useState('');

  const { screen, transaction } = resetPasswordMfaSmsChallenge;
  // useResend hook (countdown for resend)
  const { remaining, disabled, startResend } = useResend({ timeoutSeconds: 12 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await continueMfaSmsChallenge({
      code,
    });
  };

  const handleResendCode = async () => {
    await startResend();
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  const handleGetACall = async () => {
    try {
      await getACall();
    } catch (error) {
      console.error('Get a call failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center"><div className="w-20 h-20"><Logo /></div></div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">{ screen?.texts?.title ?? 'Verify Your Identity' }</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{ screen?.texts?.description ?? 'Enter the code sent to ' + (screen.data?.phoneNumber || 'your phone number') }</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">{ screen?.texts?.placeholder ?? 'Enter the 6-digit code' }</label>
            <input id="code" name="code" type="text" placeholder={ screen?.texts?.placeholder ?? 'Enter the 6-digit code' } required value={code} onChange={(e) => setCode(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {transaction?.errors?.length && (<div className="mt-2 space-y-1" aria-live="polite">{transaction.errors.map((err, index) => (<p key={index} className="text-red-600 text-xs">{err.message}</p>))}</div>)}
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{ screen?.texts?.buttonText ?? 'Continue' }</button>
        </form>
        {/* Alternative Actions */}
        <div className="mt-6 space-y-3">
          <button onClick={handleResendCode} disabled={disabled} className={`w-full flex justify-center py-2 px-4 rounded-md border text-sm font-medium ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}>{disabled ? `${screen?.texts?.resendDisabledText || 'Resend in'} ${remaining}s` : (screen?.texts?.resendActionText ?? 'Resend Code')}</button>
          <button onClick={handleTryAnotherMethod} className="w-full flex justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">{ screen?.texts?.pickAuthenticatorText ?? 'Try another method' }</button>
          { screen.data?.showLinkVoice && (<button onClick={handleGetACall} className="w-full flex justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">{ screen?.texts?.resendVoiceActionText ?? 'Get a Call' }</button>) }
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaSmsChallengeScreen;