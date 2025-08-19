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
  isValid: boolean,
  errors: Array<{ code: string; message: string }>
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
  errors
}) => (
  <div className="input-container">
    <button className="pick-country-code hidden" id="pick-country-code">
      Pick country code - {countryCode}: +{countryPrefix}
    </button>
    <label>Enter your email</label>
    <input
      type="email"
      id="email"
      ref={emailRef}
      placeholder="Enter your email"
    />
    <label>Enter your username</label>
    <input
      type="text"
      id="username"
      ref={usernameRef}
      placeholder="Enter your username"
    />
    <label>Enter your phone number</label>
    <input
      type="tel"
      id="phoneNumber"
      ref={phoneNumberRef}
      placeholder="Enter your phone number"
    />
    <label>Enter your password</label>
    <input
      type="password"
      id="password"
      ref={passwordRef}
      placeholder="Enter your password"
      aria-invalid={!isValid}
      className={`input w-full border px-4 py-2 rounded ${!isValid ? 'border-red-500' : 'border-gray-300'
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
      <Button onClick={onLoginClick}>Continue</Button>
    </div>
  </div>
); 