import  Button  from '../../../components/Button';
interface LoginFormProps {
  usernameRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  onLoginClick: () => void;
  identifierLabel: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  usernameRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  countryCode,
  countryPrefix,
  onLoginClick,
  identifierLabel
}) => (
  <div className="input-container">
    <button className="pick-country-code hidden" id="pick-country-code">
      Pick country code - {countryCode}: +{countryPrefix}
    </button>
    <label>{identifierLabel}</label>
    <input
      type="text"
      id="username"
      ref={usernameRef}
      placeholder={identifierLabel}
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