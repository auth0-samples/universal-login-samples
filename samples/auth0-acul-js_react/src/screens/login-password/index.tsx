import React, { useState, useRef } from "react";
import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";
import { Logo } from "../../components/Logo";
import Button from "../../components/Button";
import "../../styles/screens/login-password.scss";

// Types
interface Connection {
  name: string;
}

const LoginPasswordScreen: React.FC = () => {
  const [loginPasswordManager] = useState(() => new LoginPasswordInstance());
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  // Extract data from manager
  const username = loginPasswordManager.screen.data?.username || "";
  const isCaptchaAvailable = loginPasswordManager.screen.isCaptchaAvailable;
  const captchaImage = loginPasswordManager.screen.captchaImage;
  const screenLinks = loginPasswordManager.screen.links;
  const { signupLink, resetPasswordLink } = loginPasswordManager.screen;
  const errors = loginPasswordManager.transaction.hasErrors ? loginPasswordManager.transaction.errors : null;
  // console.log(loginPasswordManager.transaction, "loginPasswordManager.transaction");

  // Handlers
  const login = (options: { username: string; password: string; captcha: string }) => {
    loginPasswordManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginPasswordManager.federatedLogin({ connection: connectionName });
  };

  const handleSwitchConnection = (connectionName: string) => {
    loginPasswordManager.switchConnection({ connection: connectionName });
  };

  const handleSubmit = () => {
    const password = passwordRef.current?.value || "";
    const captcha = captchaRef.current?.value || "";
    login({ username, password, captcha });
  };

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />

      {/* Login Form */}
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
          <button id="continue" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>

      {/* Federated Login */}
      <div className="federated-login-container">
        {loginPasswordManager.transaction.alternateConnections?.map((connection: Connection) => (
          <Button
            key={connection.name}
            onClick={() => handleSocialConnectionLogin(connection.name)}
          >
            Continue with {connection.name}
          </Button>
        ))}
      </div>

      {/* Switch Connection Options */}
      <div className="federated-login-container">
        {/* {loginPasswordManager.transaction.currentConnection && ( */}
        <>
          <Button onClick={() => handleSwitchConnection('email')}>
            Switch to Email
          </Button>
          <Button onClick={() => handleSwitchConnection('sms')}>
            Switch to SMS
          </Button>
        </>
        {/* )} */}
      </div>

      {/* Links */}
      {screenLinks && (
        <div className="links">
          {signupLink && <a href={signupLink}>Sign Up</a>}
          {resetPasswordLink && <a href={resetPasswordLink}>Reset Password</a>}
        </div>
      )}

      {/* Error Messages */}
      {errors && (
        <div className="error-container">
          {errors.map((error: { message: string }, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginPasswordScreen;
