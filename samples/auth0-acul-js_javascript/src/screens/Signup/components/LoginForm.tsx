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
  errors,
  identifiers = [],
}) => (
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
      className={`input w-full border px-4 py-2 rounded ${
        !isValid ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {!isValid && (
      <ul className="text-red-500 text-sm list-disc list-inside">
        {errors.map((err) => (
          <li key={err.code}>{err.message}</li>
        ))}
      </ul>
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
);
