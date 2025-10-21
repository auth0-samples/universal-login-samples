import React, { useEffect, useState, useMemo, useRef } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { Logo } from "../../components/Logo";
import Button from "../../components/Button";

// Types
interface Connection {
  name: string;
}

interface Error {
  message?: string;
}

const LoginIdScreen: React.FC = () => {
  // State and refs
  const [loginManager] = useState(() => new LoginIdInstance());
  const usernameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  // Register passkey autofill on mount
  useEffect(() => {
    (async () => {
      await loginManager.registerPasskeyAutofill('username');
    })();
  }, []);

  // Get form values
  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  // Handlers
  const handleLogin = (username: string, captcha: string): void => {
    const options = {
      username,
      captcha: loginManager.screen.isCaptchaAvailable ? captcha : "",
    };
    loginManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginManager.federatedLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginManager.passkeyLogin();
  };

  const onLoginClick = () => {
    const { username, captcha } = getFormValues();
    handleLogin(username, captcha);
  };

  // Get active identifiers
  const activeIdentifiers = useMemo(() => loginManager.getLoginIdentifiers(), []);

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  const screenTexts = loginManager.screen.texts!;

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />
      
      {/* Title */}
      <div className="title-container">
        <h1>{screenTexts?.title}</h1>
        <p>{screenTexts?.description}</p>
      </div>

      {/* Login Form */}
      <div className="input-container">
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {loginManager.transaction.countryCode}: +{loginManager.transaction.countryPrefix}
        </button>
        <label>{getIdentifierLabel()}</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder={getIdentifierLabel()}
        />

        {loginManager.screen.isCaptchaAvailable && (
          <div className="captcha-container">
            <img src={loginManager.screen.captchaImage ?? ""} alt="Captcha" />
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

      {/* Federated Login */}
      <div className="federated-login-container">
        {loginManager.transaction.alternateConnections?.map((connection: Connection) => (
          <Button
            key={connection.name}
            onClick={() => handleSocialConnectionLogin(connection.name)}
          >
            Continue with {connection.name}
          </Button>
        ))}
      </div>

      {/* Passkey Button */}
      <div className="passkey-container">
        <Button onClick={handlePasskeyLogin}>Continue with Passkey</Button>
      </div>

      {/* Links */}
      {loginManager.screen.links && (
        <div className="links">
          {loginManager.screen.signupLink && <a href={loginManager.screen.signupLink}>Sign Up</a>}
          {loginManager.screen.resetPasswordLink && <a href={loginManager.screen.resetPasswordLink}>Forgot Password?</a>}
        </div>
      )}

      {/* Error Messages */}
      {loginManager.transaction.hasErrors && loginManager.transaction.errors && (
        <div className="error-container">
          {loginManager.transaction.errors.map((error: Error, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginIdScreen;
