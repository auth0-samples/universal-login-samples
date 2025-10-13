import React, { useState, useMemo } from "react";
import LoginSDK from "@auth0/auth0-acul-js/login";

import { useLoginForm } from "./hooks/useLoginForm";
import { Logo } from "../../components/Logo";
import { Title } from "./components/Title";
import { LoginForm } from "./components/LoginForm";
import { FederatedLogin } from "./components/FederatedLogin";
import { Links } from "./components/Links";
import { ErrorMessages } from "./components/ErrorMessages";

const LoginScreen: React.FC = () => {
  const [loginManager] = useState(() => new LoginSDK());
  const { usernameRef, passwordRef, captchaRef, getFormValues } = useLoginForm();

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

  const activeIdentifiers = useMemo(() => loginManager.getLoginIdentifiers(), []);

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  const errors = loginManager.getErrors();

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={loginManager.screen.texts!} />

      <LoginForm
        usernameRef={usernameRef}
        passwordRef={passwordRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={loginManager.screen.isCaptchaAvailable}
        captchaImage={loginManager.screen.captchaImage ?? undefined}
        countryCode={loginManager.transaction.countryCode ?? undefined}
        countryPrefix={loginManager.transaction.countryPrefix ?? undefined}
        onLoginClick={handleLogin}
        identifierLabel={getIdentifierLabel()}
      />

      <FederatedLogin
        connections={loginManager.transaction.alternateConnections ?? undefined}
        onFederatedLogin={handleFederatedLogin}
      />

      <Links
        signupLink={loginManager.screen.signupLink ?? undefined}
        resetPasswordLink={loginManager.screen.resetPasswordLink ?? undefined}
      />

      {loginManager.transaction.hasErrors && errors && <ErrorMessages errors={errors} />}
    </div>
  );
};

export default LoginScreen;
