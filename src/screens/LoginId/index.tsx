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
      <Title screenTexts={loginIdManager.screen.texts!} />
      
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
        connections={loginIdManager.transaction.alternateConnections!}
        onSocialLogin={handleSocialConnectionLogin}
      />

      <PasskeyButton onPasskeyLogin={handlePasskeyLogin} />

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

export default LoginIdScreen;
