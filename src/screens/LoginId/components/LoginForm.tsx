import  Button  from '../../../components/Button/index';
interface LoginFormProps {
  usernameRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  onLoginClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  usernameRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  countryCode,
  countryPrefix,
  onLoginClick,
}) => (
  <div className="input-container">
    <button className="pick-country-code hidden" id="pick-country-code">
      Pick country code - {countryCode}: +{countryPrefix}
    </button>
    <label>Enter your email</label>
    <input
      type="text"
      id="username"
      ref={usernameRef}
      placeholder="Enter your email"
    />

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