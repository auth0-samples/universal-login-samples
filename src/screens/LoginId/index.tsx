import React from "react";
import { useLoginIdManager } from './hooks/useLoginIdManager';
import { useLoginForm } from './hooks/useLoginForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import { PasskeyButton } from './components/PasskeyButton';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const LoginIdScreen: React.FC = () => {
  const { loginIdManager, handleLogin, handleSocialConnectionLogin, handlePasskeyLogin } = useLoginIdManager();
  const { usernameRef, captchaRef, getFormValues } = useLoginForm();

  const onLoginClick = () => {
    const { username, captcha } = getFormValues();
    handleLogin(username, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={loginIdManager.screen.getScreenTexts()!} />
      
      <LoginForm
        usernameRef={usernameRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={loginIdManager.screen.isCaptchaAvailable}
        captchaImage={loginIdManager.screen.captchaImage!}
        countryCode={loginIdManager.transaction.countryCode!}
        countryPrefix={loginIdManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
      />

      <SocialLogin
        connections={loginIdManager.transaction.getAlternateConnections()!}
        onSocialLogin={handleSocialConnectionLogin}
      />

      <PasskeyButton onPasskeyLogin={handlePasskeyLogin} />

      {loginIdManager.screen.getScreenLinks() && (
        <Links
          signupLink={loginIdManager.screen.signupLink!}
          resetPasswordLink={loginIdManager.screen.resetPasswordLink!}
        />
      )}

      {loginIdManager.transaction.hasErrors && loginIdManager.transaction.getErrors() && (
        <ErrorMessages errors={loginIdManager.transaction.getErrors()!} />
      )}
    </div>
  );
};

export default LoginIdScreen;
