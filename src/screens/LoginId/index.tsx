import React, { useRef, useState } from "react";
import LoginIdInstance from "ul-javascript/login-id";
import Button from "../../components/Button";
import "../../styles/screens/login-id.scss";

const LoginIdScreen: React.FC = () => {
  const [loginId] = useState(() => new LoginIdInstance());
  const usernameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const handleContinue = (): void => {
    const username = usernameRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";
    const options = {
      username,
      captcha: loginId.screen.hasCaptcha ? captcha : "",
    };
    loginId.continueWithUsername(options);
  };

  const handleFederatedLogin = (connectionName: string) => {
    loginId.continueWithFederatedLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginId.continueWithPasskey({});
  };

  return (
    <div className="prompt-container">
      <div className="logo-container">
        <img src="http://localhost:5173/assets/images/logo.png" alt="Logo" />
      </div>

      <div className="title-container">
        <h1>{loginId.screen.texts?.title}</h1>
        <p>{loginId.screen.texts?.description}</p>
      </div>

      <div className="input-container">
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {loginId.transaction.countryCode}: +
          {loginId.transaction.countryPrefix}
        </button>
        <label>Enter your email</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder="Enter your email"
        />

        {loginId.screen.hasCaptcha && (
          <div className="captcha-container">
            <img src={loginId.screen.captchaImage} alt="Captcha" />
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
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>

      <div className="federated-login-container">
        {loginId.transaction.alternateConnections?.map((connection) => (
          <Button
            key={connection.name}
            onClick={() => handleFederatedLogin(connection.name)}
          >
            Continue with {connection.name}
          </Button>
        ))}
      </div>

      <div className="passkey-container">
        <Button onClick={handlePasskeyLogin}>Continue with Passkey</Button>
      </div>

      <div className="links">
        {loginId.screen.signupLink && (
          <a href={loginId.screen.signupLink}>Sign Up</a>
        )}
        {loginId.screen.passwordResetLink && (
          <a href={loginId.screen.passwordResetLink}>Forgot Password?</a>
        )}
      </div>

      {loginId.transaction.errors?.length > 0 && (
        <div className="error-container">
          {loginId.transaction.errors.map((error, index) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginIdScreen;
