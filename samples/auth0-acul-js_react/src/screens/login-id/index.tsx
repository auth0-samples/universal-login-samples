import React, { useMemo } from "react";
import { useLoginManager } from './hooks/useLoginManager';
import { useLoginForm } from './hooks/useLoginForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { FederatedLogin } from './components/FederatedLogin';
import { PasskeyButton } from './components/PasskeyButton';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const LoginIdScreen: React.FC = () => {
  const { loginManager, handleLogin, handleSocialConnectionLogin, handlePasskeyLogin } = useLoginManager();
  const { usernameRef, captchaRef, getFormValues } = useLoginForm();
  const activeIdentifiers = useMemo(() => loginManager.getLoginIdentifiers(), []);

  const onLoginClick = () => {
    const { username, captcha } = getFormValues();
    handleLogin(username, captcha);
  };

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={loginManager.screen.texts!} />

      <LoginForm
        usernameRef={usernameRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={loginManager.screen.isCaptchaAvailable}
        captchaImage={loginManager.screen.captchaImage!}
        countryCode={loginManager.transaction.countryCode!}
        countryPrefix={loginManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
        identifierLabel={getIdentifierLabel()}
      />

      <FederatedLogin
        connections={loginManager.transaction.alternateConnections!}
        onFederatedLogin={handleSocialConnectionLogin}
      />

      <PasskeyButton onPasskeyLogin={handlePasskeyLogin} />

      {loginManager.screen.links && (
        <Links
          signupLink={loginManager.screen.signupLink!}
          resetPasswordLink={loginManager.screen.resetPasswordLink!}
        />
      )}

      {loginManager.transaction.hasErrors && loginManager.transaction.errors && (
        <ErrorMessages errors={loginManager.transaction.errors!} />
      )}
    </div>
  );
};

export default LoginIdScreen;
