import Button from '../../../components/Button';

interface LoginFormProps {
  emailRef: React.RefObject<HTMLInputElement>;
  usernameRef: React.RefObject<HTMLInputElement>;
  phoneNumberRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  onLoginClick: () => void;
  isValid: boolean;
  errors: Array<{ code: string; message: string }>;
  identifiers?: Array<{ type: string; required: boolean }> | null;
  passwordValidation?: Array<{ code: string; policy: string; isValid: boolean }>;
  onPasswordChange?: (password: string) => void;
  hasTypedPassword?: boolean;
}


export const LoginForm: React.FC<LoginFormProps> = ({
  emailRef,
  usernameRef,
  phoneNumberRef,
  passwordRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  countryCode,
  countryPrefix,
  onLoginClick,
  isValid,
  // errors,
  identifiers = [],
  passwordValidation,
  onPasswordChange,
  hasTypedPassword
}) => (
  <>
    {console.log(passwordValidation, "ankita")}   

  <div className="input-container">
    <button className="pick-country-code hidden" id="pick-country-code">
      Pick country code - {countryCode}: +{countryPrefix}
    </button>

    {identifiers?.find((id) => id.type === 'email') && (
      <>
        <label htmlFor="email">
          Enter your email{' '}
          {identifiers.find((id) => id.type === 'email')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Enter your email"
          required={identifiers.find((id) => id.type === 'email')?.required}
        />
      </>
    )}

    {identifiers?.find((id) => id.type === 'username') && (
      <>
        <label htmlFor="username">
          Enter your username{' '}
          {identifiers.find((id) => id.type === 'username')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder="Enter your username"
          required={identifiers.find((id) => id.type === 'username')?.required}
        />
      </>
    )}

    {identifiers?.find((id) => id.type === 'phone') && (
      <>
        <label htmlFor="phoneNumber">
          Enter your phone number{' '}
          {identifiers.find((id) => id.type === 'phone')?.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <input
          type="tel"
          id="phoneNumber"
          ref={phoneNumberRef}
          placeholder="Enter your phone number"
          required={identifiers.find((id) => id.type === 'phone')?.required}
        />
      </>
    )}

    <label htmlFor="password">
      Enter your password <span className="text-red-500">*</span>
    </label>
    <input
      type="password"
      id="password"
      ref={passwordRef}
      placeholder="Enter your password"
      aria-invalid={!isValid}
      required
      className={`input w-full border px-4 py-2 rounded ${!isValid ? 'border-red-500' : 'border-gray-300'
        }`}
      onChange={(e) => onPasswordChange?.(e.target.value)} // live validation
    />

    {/* {hasTypedPassword && passwordValidation && passwordValidation.length > 0 && (
      <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
        <p className="mb-1 text-gray-700">Your password must contain:</p>
        <ul className="list-disc list-inside space-y-1"> */}
          {/* Render top-level rules (excluding subitems) */}
          {/* {passwordValidation
            .filter(rule => ![
              'password-policy-lower-case',
              'password-policy-upper-case',
              'password-policy-numbers',
              'password-policy-special-characters'
            ].includes(rule.code))
            .map((rule) => (
              <li
                key={rule.code}
                className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
              >
                {rule.policy}
              </li>
            ))} */}

          {/* Render the grouped rule for subitems */}
          {/* {passwordValidation.some(rule =>
            ['password-policy-lower-case', 'password-policy-upper-case', 'password-policy-numbers', 'password-policy-special-characters'].includes(rule.code)
          ) && (
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  {passwordValidation
                    .filter(rule =>
                      ['password-policy-lower-case', 'password-policy-upper-case', 'password-policy-numbers', 'password-policy-special-characters'].includes(rule.code)
                    )
                    .map((rule) => (
                      <li
                        key={rule.code}
                        className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                      >
                        {rule.policy}
                      </li>
                    ))}
                </ul>
            )} */}
        {/* </ul>
      </div>
    )} */}

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
        <img src={captchaImage ?? ''} alt="Captcha" />
        <label htmlFor="captcha">Enter the captcha</label>
        <input
          type="text"
          id="captcha"
          ref={captchaRef}
          placeholder="Enter the captcha"
        />
      </div>
    )}

    <div className="button-container">
      <Button onClick={onLoginClick}>Continue</Button>
    </div>
  </div>
  </>
);
