import React, { useState, useMemo, useRef } from "react";
import LoginSDK from "@auth0/auth0-acul-js/login";
import { Logo } from "../../components/Logo";
import Button from "../../components/Button";

// Types
interface Connection {
  name: string;
}

interface Error {
  message?: string;
}

const LoginScreen: React.FC = () => {
  const [loginManager] = useState(() => new LoginSDK());


  // Refs for form inputs
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  console.log("usernameRef-->", usernameRef);


  // Get form values
  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  const handleLogin = async () => {
    const { username, password, captcha } = getFormValues();
    await loginManager.login({
      username,
      password,
      captcha: loginManager.screen.isCaptchaAvailable ? captcha : "",
    });
  };

  const handleFederatedLogin = async (connectionName: string) => {
    await loginManager.federatedLogin({ connection: connectionName });
  };

  // const handleChangeLanguage = async () => {
  //   const { username, password } = getFormValues();
  //   // console.log("Changing language to French for user:", username);

  //   await loginManager.changeLanguage({
  //     username: username,
  //     password: password,
  //     language: "fr",
  //     persist: "session"
  //   });
  //   console.log("Changing language to French for user:", username);

  // };

  const activeIdentifiers = useMemo(() => loginManager.getLoginIdentifiers(), []);

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  const errors = loginManager.getErrors();
  const screenTexts = loginManager.screen.texts!;
  const connections = loginManager.transaction.alternateConnections;
  const signupLink = loginManager.screen.signupLink;
  const resetPasswordLink = loginManager.screen.resetPasswordLink;

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

        <label>{screenTexts?.usernameOrEmailPlaceholder || screenTexts?.usernamePlaceholder || getIdentifierLabel()}</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder={screenTexts?.usernameOrEmailPlaceholder || screenTexts?.usernamePlaceholder || getIdentifierLabel()}
        />

        <label>{screenTexts?.passwordPlaceholder || "Enter your password"}</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          placeholder={screenTexts?.passwordPlaceholder || "Enter your password"}
        />

        {loginManager.screen.isCaptchaAvailable && (
          <div className="captcha-container">
            <img src={loginManager.screen.captchaImage ?? ""} alt="Captcha" />
            <label>{screenTexts?.captchaCodePlaceholder || "Enter the captcha"}</label>
            <input
              type="text"
              id="captcha"
              ref={captchaRef}
              placeholder={screenTexts?.captchaCodePlaceholder || "Enter the captcha"}
            />
          </div>
        )}

        <div className="button-container">
          <Button id="continue" onClick={handleLogin}>{screenTexts?.buttonText || "Continue"}</Button>
        </div>

        {/* <div className="button-container" style={{ marginTop: '1rem' }}>
          <Button id="change-language" onClick={handleChangeLanguage}>Change Language</Button>
        </div> */}
      </div>

      {/* Federated Login */}
      <div className="federated-login-container">
        {connections?.map((connection: Connection) => (
          <Button
            key={connection.name}
            onClick={() => handleFederatedLogin(connection.name)}
          >
            Continue with {connection.name}
          </Button>
        ))}
      </div>

      {/* Links */}
      <div className="links">
        {signupLink && <a href={signupLink}>{screenTexts?.signupActionLinkText || "Sign Up"}</a>}
        {resetPasswordLink && <a href={resetPasswordLink}>{screenTexts?.forgotPasswordText || "Forgot Password?"}</a>}
      </div>

      {/* Error Messages */}
      {loginManager.transaction.hasErrors && errors && (
        <div className="error-container">
          {errors?.map((error: Error, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
