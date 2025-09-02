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
  isValid: boolean;
  isValidConfirmPassword: boolean;
  confirmPasswordErrors: Array<{ code: string; message: string }>;
  errors: Array<{ code: string; message: string }>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  newPasswordRef,
  confirmPasswordRef,
  captchaRef,
  isCaptchaAvailable,
  captchaImage,
  onLoginClick,
  isValid,
  isValidConfirmPassword,
  confirmPasswordErrors,
  errors
}) => (
  <div className="input-container">
    <label>Enter your new password</label>
    <input
      type="password"
      id="newPassword"
      ref={newPasswordRef}
      aria-invalid={!isValid}
      placeholder="Enter your password"
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
    <label>Confirm your new password</label>
    <input
      type="password"
      id="password"
      ref={confirmPasswordRef}
      aria-invalid={!isValidConfirmPassword}
      placeholder="Re-enter your password"
      required
      className={`input w-full border px-4 py-2 rounded ${
        !isValidConfirmPassword ? 'border-red-500' : 'border-gray-300'
      }`}
    />

    {!isValidConfirmPassword && (
      <ul className="text-red-500 text-sm list-disc list-inside">
        {confirmPasswordErrors.map((err) => (
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
      <Button id="continue" onClick={onLoginClick}>Continue</Button>
    </div>
  </div>
); 