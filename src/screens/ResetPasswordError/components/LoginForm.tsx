import  Button  from '../../../components/Button';
interface LoginFormProps {
  newPasswordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  onLoginClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  newPasswordRef,
  confirmPasswordRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  onLoginClick,
}) => (
  <div className="input-container">
    <label>Enter your new password</label>
    <input
      type="password"
      id="newPassword"
      ref={newPasswordRef}
      placeholder="Enter your email"
    />
    <label>Confirm your new password</label>
    <input
      type="password"
      id="password"
      ref={confirmPasswordRef}
      placeholder="Enter your password"
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
      <Button id="continue" onClick={onLoginClick}>Continue</Button>
    </div>
  </div>
); 