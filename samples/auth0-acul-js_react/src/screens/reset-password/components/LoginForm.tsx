import Button from '../../../components/Button';
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
  errors: Array<{ code: string; message: string }>;
  passwordValidation?: Array<{ code: string; policy: string; isValid: boolean }>;
  onPasswordChange?: (password: string) => void;
  hasTypedPassword?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  newPasswordRef,
  confirmPasswordRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  onLoginClick,
  isValid,
  passwordValidation,
  onPasswordChange,
  hasTypedPassword
}) => (
  <div className="input-container">
    <label>Enter your new password</label>
    <input
      type="password"
      id="newPassword"
      ref={newPasswordRef}
      aria-invalid={!isValid}
      placeholder="Enter your password"
      onChange={(e) => onPasswordChange?.(e.target.value)}
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

    {hasTypedPassword && passwordValidation && passwordValidation.length > 0 && (
      <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
        <p className="mb-1 text-gray-700">Your password must contain:</p>
        <ul className="list-disc list-inside space-y-1">
          {(() => {
            const subItemCodes = [
              'password-policy-lower-case',
              'password-policy-upper-case',
              'password-policy-numbers',
              'password-policy-special-characters'
            ];

            const containsAtLeastRule = passwordValidation.find(
              r => r.code === 'password-policy-contains-at-least'
            );

            return passwordValidation.map((rule) => {
              const isSubItem = subItemCodes.includes(rule.code);

              // If we have a parent rule, subitems will be rendered under it, so skip them here
              if (containsAtLeastRule && isSubItem) return null;

              // Render the "contains at least" rule with subitems
              if (rule.code === 'password-policy-contains-at-least') {
                const subItems = passwordValidation.filter(r =>
                  subItemCodes.includes(r.code)
                );

                return (
                  <li
                    key={rule.code}
                    className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                  >
                    {rule.policy}
                    {subItems.length > 0 && (
                      <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                        {subItems.map((subItem) => (
                          <li
                            key={subItem.code}
                            className={subItem.isValid ? 'text-green-600' : 'text-gray-700'}
                          >
                            {subItem.policy}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              // Render all others normally
              return (
                <li
                  key={rule.code}
                  className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                >
                  {rule.policy}
                </li>
              );
            });
          })()}
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