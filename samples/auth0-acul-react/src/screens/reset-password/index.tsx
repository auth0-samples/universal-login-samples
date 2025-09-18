import React, { useRef, useState } from 'react';
import {
  useScreen,
  useTransaction,
  resetPassword as resetPasswordMethod,
  usePasswordValidation
} from '@auth0/auth0-acul-react/reset-password';

import { Logo } from '../../components/Logo';

const ResetPasswordScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('');
  const [passwordValidationRules, setPasswordValidationRules] = useState<
    Array<{
      code: string;
      policy: string;
      isValid: boolean;
      items?: Array<{ code: string; policy: string; isValid: boolean }>;
    }>
  >([]);

  const [hasTypedPassword, setHasTypedPassword] = useState(false);

  const handlePasswordChange = (value: string) => {
    if (!hasTypedPassword && value.length > 0) setHasTypedPassword(true);

    setPassword(value);
    const validationRules = usePasswordValidation(value) || [];
    setPasswordValidationRules(validationRules);
  };

  const isValid = passwordValidationRules.length === 0 || passwordValidationRules.every(rule => rule.isValid);

  const handleResetPassword = () => {
    const newPassword = newPasswordRef.current?.value ?? '';
    const confirmPassword = confirmPasswordRef.current?.value ?? '';
    const captcha = captchaRef.current?.value ?? '';

    if (!isValid || newPassword !== confirmPassword) {
      return;
    }

    resetPasswordMethod({
        'password-reset': newPassword,
        're-enter-password': confirmPassword,
        ...(screen.isCaptchaAvailable && { captcha })
    });
  };

  const renderRules = (
    rules: Array<{
      code: string;
      policy: string;
      isValid: boolean;
      items?: Array<{ code: string; policy: string; isValid: boolean }>;
    }>
  ) => {
    const subItemCodes = [
      'password-policy-lower-case',
      'password-policy-upper-case',
      'password-policy-numbers',
      'password-policy-special-characters'
    ];

    const containsAtLeastRule = rules.find(r => r.code === 'password-policy-contains-at-least');

    return (
      <>
        {rules.length > 0 && (
          <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
            <p className="mb-1 text-gray-700">Your password must contain:</p>
            <ul className="list-disc list-inside space-y-1">
              {rules.map(rule => {
                const isSubItem = subItemCodes.includes(rule.code);

                if (containsAtLeastRule && isSubItem) return null;

                if (rule.code === 'password-policy-contains-at-least') {
                  const subItems = rules.filter(r => subItemCodes.includes(r.code));
                  return (
                    <li key={rule.code} className={rule.isValid ? 'text-green-600' : 'text-gray-700'}>
                      {rule.policy}
                      {subItems.length > 0 && (
                        <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                          {subItems.map(sub => (
                            <li key={sub.code} className={sub.isValid ? 'text-green-600' : 'text-gray-700'}>
                              {sub.policy}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={rule.code} className={rule.isValid ? 'text-green-600' : 'text-gray-700'}>
                    {rule.policy}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
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
          {screen.texts?.title || 'Reset Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || 'Enter your new password below'}
        </p>

        {/* Content */}
        <div className="mt-6 space-y-4">
          <div className="rounded-md shadow-sm">
            {/* New Password */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your new password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                ref={newPasswordRef}
                placeholder="Enter new password"
                onChange={(e) => handlePasswordChange(e.target.value)}
                aria-invalid={!isValid}
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  !isValid ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {hasTypedPassword && password.length > 0 && renderRules(passwordValidationRules)}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm your new password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordRef}
                placeholder="Confirm new password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Captcha */}
            {screen.isCaptchaAvailable && (
              <div className="mb-4">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the captcha
                </label>
                <img src={screen.captchaImage ?? ''} alt="Captcha" className="mb-2 w-full rounded" />
                <input
                  type="text"
                  id="captcha"
                  ref={captchaRef}
                  placeholder="Enter the captcha"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div>
            <button
              onClick={handleResetPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Errors */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {transaction.errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
