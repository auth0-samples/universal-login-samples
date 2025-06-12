import React from "react";
import { useLoginManager } from './hooks/useLoginManager';
import { useLoginForm } from './hooks/useLoginForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { FederatedLogin } from './components/FederatedLogin';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const LoginScreen: React.FC = () => {
  const { loginIdManager, handleLogin, handleSocialConnectionLogin } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } = useLoginForm();

  const onLoginClick = () => {
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={loginIdManager.screen.texts!} />

      <LoginForm
        usernameRef={usernameRef}
        passwordRef={passwordRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={loginIdManager.screen.isCaptchaAvailable}
        captchaImage={loginIdManager.screen.captchaImage!}
        countryCode={loginIdManager.transaction.countryCode!}
        countryPrefix={loginIdManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
      />

      <FederatedLogin
        connections={loginIdManager.transaction.alternateConnections!}
        onFederatedLogin={handleSocialConnectionLogin}
      />

      {loginIdManager.screen.links && (
        <Links
          signupLink={loginIdManager.screen.signupLink!}
          resetPasswordLink={loginIdManager.screen.resetPasswordLink!}
        />
      )}

      {loginIdManager.transaction.hasErrors && loginIdManager.transaction.errors && (
        <ErrorMessages errors={loginIdManager.transaction.errors!} />
      )}
    </div>
  );
};

export default LoginScreen;
