import React, { useRef } from 'react';

interface LoginFormProps {
  username: string;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
  onSubmit: (password: string, captcha: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  username,
  isCaptchaAvailable,
  captchaImage,
  onSubmit,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    const password = passwordRef.current?.value || "";
    const captcha = captchaRef.current?.value || "";
    onSubmit(password, captcha);
  };

  return (
    <div className="input-container">
      <label>Enter your username</label>
      <input
        type="text"
        id="username"
        value={username}
        placeholder="Enter your username"
        disabled
      />
      
      <label>Enter your password</label>
      <input
        type="password"
        id="password"
        ref={passwordRef}
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
        <button id="continue" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};