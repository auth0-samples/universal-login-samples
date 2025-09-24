import React from 'react';
import Button from '../../../components/Button';
import type { PasswordValidationResult } from '@auth0/auth0-acul-js';

interface ValidationError {
  code: string;
  message: string;
}

interface SignupFormProps {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  captcha: string;
  isCaptchaAvailable: boolean;
  captchaImage?: string | null;
  countryCode?: string | null;
  countryPrefix?: string | null;
  identifiers?: Array<{ type: string; required: boolean }> | null;
  passwordValidation: PasswordValidationResult;
  usernameValidation: { isValid: boolean; errors: ValidationError[] };
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPhoneNumber: (phone: string) => void;
  setPassword: (password: string) => void;
  setCaptcha: (captcha: string) => void;
  onSubmit: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  email,
  username,
  phoneNumber,
  password,
  captcha,
  isCaptchaAvailable,
  captchaImage,
  identifiers,
  passwordValidation,
  usernameValidation,
  setEmail,
  setUsername,
  setPhoneNumber,
  setPassword,
  setCaptcha,
  onSubmit,
}) => (
  <div className="input-container space-y-4">
    {identifiers?.find((id) => id.type === 'email') && (
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email{' '}
          {identifiers.find((id) => id.type === 'email')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={identifiers.find((id) => id.type === 'email')?.required}
          placeholder="Enter your email"
        />
      </div>
    )}

    {identifiers?.find((id) => id.type === 'username') && (
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username{' '}
          {identifiers.find((id) => id.type === 'username')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={identifiers.find((id) => id.type === 'username')?.required}
          className={!usernameValidation.isValid ? 'border-red-500' : ''}
          placeholder="Enter your username"
        />
        {username && usernameValidation.errors.length > 0 && (
          <ul className="text-red-500 text-sm mt-1">
            {usernameValidation.errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        )}
      </div>
    )}

    {identifiers?.find((id) => id.type === 'phone') && (
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone number{' '}
          {identifiers.find((id) => id.type === 'phone')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required={identifiers.find((id) => id.type === 'phone')?.required}
          placeholder="Enter your phone number"
        />
      </div>
    )}

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={!passwordValidation.isValid ? 'border-red-500' : ''}
        placeholder="Enter your password"
      />

      {password.length > 0 && passwordValidation.results.length > 0 && (
        <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
          <p className="text-gray-700 mb-1">Your password must contain:</p>
          <ul className="list-disc ml-4">
            {passwordValidation.results.map((rule) => (
              <li
                key={rule.code}
                className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
              >
                {rule.label}
                {rule.items && rule.items.length > 0 && (
                  <ul className="ml-5 list-disc">
                    {rule.items.map((sub) => (
                      <li
                        key={sub.code}
                        className={sub.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                      >
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {isCaptchaAvailable && (
      <div>
        {captchaImage && <img src={captchaImage} alt="Captcha" className="mb-2" />}
        <label>Captcha</label>
        <input
          type="text"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          placeholder="Enter captcha"
        />
      </div>
    )}

    <div className="button-container">
      <Button onClick={onSubmit}>Continue</Button>
    </div>
  </div>
);
