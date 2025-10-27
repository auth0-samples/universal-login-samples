import React, { useState } from 'react';
import { useMfaRecoveryCodeEnrollment, continueMethod } from '@auth0/auth0-acul-react/mfa-recovery-code-enrollment';
import { Logo } from '../../components/Logo';

const MfaRecoveryCodeEnrollmentScreen: React.FC = () => {
  const mfaRecoveryCodeEnrollment = useMfaRecoveryCodeEnrollment();
  const { screen, transaction } = mfaRecoveryCodeEnrollment;
  const texts = screen?.texts ?? {};

  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const handleContinue = async () => {
    try {
      await continueMethod({ isCodeCopied });
    } catch (error) {
      console.error('Failed to continue:', error);
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
          {texts.title ?? 'MFA Recovery Code Enrollment'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'Please save this recovery code in a safe place:'}
        </p>
        {/* Code Box */}
        <div className="mt-6">
          <p className="text-center font-mono text-base tracking-wider bg-gray-50 p-3 rounded border border-gray-200 select-all">
            {screen?.data?.textCode ?? '******-******'}
          </p>
          <p className="mt-2 text-[11px] text-center text-gray-500">
            {texts.copyHintText || 'Copy or store this code securely.'}
          </p>
        </div>
        {/* Confirmation Checkbox */}
        <div className="mt-6 flex items-start gap-2">
          <input
            type="checkbox"
            id="saved-code"
            checked={isCodeCopied}
            onChange={(e) => setIsCodeCopied(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
          />
          <label htmlFor="saved-code" className="text-sm text-gray-700 leading-snug">
            {texts.confirmationText || 'I have saved the recovery code'}
          </label>
        </div>
        {/* Errors */}
        {transaction?.errors?.length ? (
          <div className="mt-4 space-y-1" aria-live="polite">
            {transaction.errors.map((err, index) => (
              <p key={index} className="text-red-600 text-xs text-center">
                {err.message}
              </p>
            ))}
          </div>
        ) : null}
        {/* Continue Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!isCodeCopied}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !isCodeCopied ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {texts.buttonText ?? 'I have saved the code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeEnrollmentScreen;
