import React, { useState, FormEvent, ChangeEvent } from 'react';
import type { ContinueWithCodeOptionPayload } from '@auth0/auth0-acul-react/types';
import { continueWithCode, useLoginEmailVerification, useResend } from '@auth0/auth0-acul-react/login-email-verification';
import { Logo } from '../../components/Logo';

const LoginEmailVerificationScreen: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uiMessages, setUiMessages] = useState<{ type: 'error' | 'success'; text: string }[]>([]);

  const { screen, transaction, client } = useLoginEmailVerification();
  const texts = screen?.texts || {};

  const { disabled, remaining, startResend } = useResend({ timeoutSeconds: 12 });

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  const handleSubmitCode = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!code.trim()) {
      setUiMessages([{ type: 'error', text: texts.noCodeError || 'Please enter a code.' }]);
      return;
    }
    setIsSubmitting(true);
    setUiMessages([]);
    try {
      const payload: ContinueWithCodeOptionPayload = { code };
      await continueWithCode(payload);
    } catch (error: any) {
      setUiMessages([{ type: 'error', text: error.message || 'An unexpected error occurred. Please try again.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setUiMessages([]);
    try {
      await startResend();
      setUiMessages([{ type: 'success', text: texts.codeResentMessage || 'A new verification code has been sent to your email.' }]);
    } catch (error: any) {
      setUiMessages([{ type: 'error', text: error.message || 'Failed to resend code. Please try again.' }]);
    }
  };

  const title = texts.title ?? 'Verify Your Email';
  const description = texts.description ?? `We've sent a verification code to your email address. Please enter it below to continue.`;
  const codeLabel = texts.codeLabel ?? 'Verification Code';
  const codePlaceholder = texts.codePlaceholder ?? 'Enter 6-digit code';
  const continueButtonText = texts.buttonText ?? 'Continue';
  const resendButtonText = texts.resendActionText ?? 'Resend Code';
  const submittingText = texts.submittingText ?? 'Processing...';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4"><div className="w-20 h-20"><Logo /></div></div>
        {client.logoUrl && (
          <img
            src={client.logoUrl}
            alt={client.name || 'Client Logo'}
            className="mx-auto h-12 w-auto mb-4"
          />
        )}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
        <form onSubmit={handleSubmitCode} className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">{codeLabel}</label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={handleCodeChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={codePlaceholder}
              disabled={isSubmitting}
            />
          </div>
          {transaction.errors && transaction.errors.length > 0 && (
            <div aria-live="polite" className="space-y-1">
              {transaction.errors.map((err, index) => (
                <p key={`tx-error-${index}`} className="text-red-600 text-xs">{err.message}</p>
              ))}
            </div>
          )}
          {uiMessages.length > 0 && (
            <div aria-live="polite" className="space-y-1">
              {uiMessages.map((msg, idx) => (
                <p
                  key={idx}
                  className={`text-xs ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                >
                  {msg.text}
                </p>
              ))}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !code.trim()}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
          >
            {isSubmitting ? submittingText : continueButtonText}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={disabled}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none disabled:opacity-50"
          >
            {disabled ? `${texts.resendDisabledText || 'Resend in'} ${remaining}s` : resendButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginEmailVerificationScreen;