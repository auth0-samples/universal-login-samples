import React, { useRef, useState } from "react";
import LoginIdInstance from "ul-javascript/login-id";
import Button from "../../components/Button";
import "../../styles/screens/login-id.scss";

const LoginIdScreen: React.FC = () => {
  const [loginIdManager] = useState(() => new LoginIdInstance());
  const usernameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const handleLogin = (): void => {
    const username = usernameRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";
    const options = {
      username,
      captcha: loginIdManager.screen.hasCaptcha ? captcha : "",
    };
    loginIdManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginIdManager.socialLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginIdManager.passkeyLogin();
  };

  return (
    <div className="prompt-container">
      <div className="logo-container">
        <img src="YOUR_LOGO_URL" alt="Custom Logo" />
      </div>

      <div className="title-container">
        <h1>{loginIdManager.screen.getScreenTexts()?.title}</h1>
        <p>{loginIdManager.screen.getScreenTexts()?.description}</p>
      </div>

      <div className="input-container">
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {loginIdManager.transaction.countryCode}: +
          {loginIdManager.transaction.countryPrefix}
        </button>
        <label>Enter your email</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder="Enter your email"
        />

        {loginIdManager.screen.hasCaptcha && (
          <div className="captcha-container">
            <img src={loginIdManager.screen.captchaImage ?? ""} alt="Captcha" />
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
          <Button onClick={handleLogin}>Continue</Button>
        </div>
      </div>

      <div className="federated-login-container">
        {loginIdManager.transaction
          .getAlternateConnections()
          ?.map((connection) => (
            <Button
              key={connection.name}
              onClick={() => handleSocialConnectionLogin(connection.name)}
            >
              Continue with {connection.name}
            </Button>
          ))}
      </div>

      <div className="passkey-container">
        <Button onClick={handlePasskeyLogin}>Continue with Passkey</Button>
      </div>

      {loginIdManager.screen.hasScreenLinks && (
        <div className="links">
          {loginIdManager.screen.signupLink && (
            <a href={loginIdManager.screen.signupLink ?? ""}>Sign Up</a>
          )}
          {loginIdManager.screen.passwordResetLink && (
            <a href={loginIdManager.screen.passwordResetLink ?? ""}>
              Forgot Password?
            </a>
          )}
        </div>
      )}

      {loginIdManager.transaction.hasErrors &&
        loginIdManager.transaction.getErrors() && (
          <div className="error-container">
            {loginIdManager.transaction.getErrors()?.map((error, index) => (
              <p key={index}>{error?.message}</p>
            ))}
          </div>
        )}
    </div>
  );
};

export default LoginIdScreen;
