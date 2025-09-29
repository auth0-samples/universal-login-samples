import Button from '../../../components/Button';
import type { PasswordValidationResult } from '@auth0/auth0-acul-js';
interface LoginFormProps {
  newPasswordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  onLoginClick: () => void;
  isValid: boolean;
  results: PasswordValidationResult;
  setPassword?: (password: string) => void;
  password?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  newPasswordRef,
  confirmPasswordRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  onLoginClick,
  isValid,
  results,
  setPassword,
  password
}) => (
  <div className="input-container">
    <label>Enter your new password</label>
    <input
      type="password"
      id="newPassword"
      value={password}
      aria-invalid={!isValid}
      placeholder="Enter your password"
      onChange={(e) => setPassword?.(e.target.value)}
      required
      className={`input w-full border px-4 py-2 rounded ${!isValid ? 'border-red-500' : 'border-gray-300'
        }`}
    />

    <label>Confirm your new password</label>
    <input
      type="password"
      id="password"
      ref={confirmPasswordRef}
      placeholder="Re-enter your password"
      required
    />
    {password && password.length > 0 && results.results.length > 0 && (
      <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
        <p className="text-gray-700 mb-1">Your password must contain:</p>
        <ul className="list-disc ml-4">
          {results.results.map((rule) => (
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

    {isCaptchaAvailable && (
      <div className="captcha-container">
        <img src={captchaImage ?? ""} alt="Captcha" />
        <label>Enter the captcha</label>
        <input
          type="text"
          id="captcha"
          ref={captchaRef}
          placeholder="Enter the captcha"
        />
      </div>
    )}

    <div className="button-container">
      <Button id="continue" onClick={onLoginClick}>Continue</Button>
    </div>
  </div>
); 