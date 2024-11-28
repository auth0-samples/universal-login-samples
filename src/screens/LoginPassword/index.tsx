import React, { useState, useRef } from "react";
import LoginPasswordInstance from "ul-javascript/login-password";
import "../../styles/screens/login-password.scss";

const LoginPasswordScreen: React.FC = () => {
  const [loginPassword] = useState(() => new LoginPasswordInstance());

  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    const password = passwordRef.current?.value || "";
    const captcha = captchaRef.current?.value || "";

    const options = {
      username: loginPassword.untrustedData.getAuthParams()?.loginHint || "",
      password,
      captcha,
    };

    loginPassword.continueWithPassword(options);
  };

  return (
    <div className="prompt-container">
      <div className="logo-container">
        <img src="YOUR_LOGO_URL" alt="Custom Logo" />
      </div>

      <div className="input-container">
        <label>Enter your username</label>
        <input
          type="text"
          id="username"
          value={loginPassword.untrustedData.getAuthParams()?.loginHint || ""}
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

        {loginPassword.screen.hasCaptcha && (
          <div className="captcha-container">
            <img src={loginPassword.screen.captchaImage ?? ""} alt="Captcha" />
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

        {loginPassword.screen.hasScreenLinks && (
          <div className="links">
            {loginPassword.screen.signupLink && (
              <a href={loginPassword.screen.signupLink}>Sign Up</a>
            )}
            {loginPassword.screen.resetPasswordLink && (
              <a href={loginPassword.screen.resetPasswordLink}>
                Reset Password
              </a>
            )}
          </div>
        )}
      </div>

      {loginPassword.transaction.hasErrors &&
        loginPassword.transaction.getErrors() && (
          <div className="error-container">
            {loginPassword.transaction.getErrors()?.map((error, index) => (
              <p key={index}>{error?.message}</p>
            ))}
          </div>
        )}
    </div>
  );
};

export default LoginPasswordScreen;
