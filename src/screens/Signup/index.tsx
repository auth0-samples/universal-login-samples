import React from "react";
import { useSignupManager } from './hooks/useSignupManager';
import { useSignupForm } from './hooks/useSignupForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { signupManager, handleSignup, handleSocialSignup } = useSignupManager();
  const { emailRef, usernameRef, phoneNumberRef, passwordRef, captchaRef, getFormValues } = useSignupForm();

  const onLoginClick = () => {
    const { username, email, phoneNumber, password, captcha } = getFormValues();
    handleSignup(username, email, phoneNumber, password, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={signupManager.screen.texts!} />
      
      <LoginForm
        emailRef={emailRef}
        usernameRef={usernameRef}
        phoneNumberRef={phoneNumberRef}
        passwordRef={passwordRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={signupManager.screen.isCaptchaAvailable}
        captchaImage={signupManager.screen.captchaImage!}
        countryCode={signupManager.transaction.countryCode!}
        countryPrefix={signupManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
      />

      <SocialLogin
        connections={signupManager.transaction.alternateConnections!}
        onSocialLogin={handleSocialSignup}
      />

      {signupManager.screen.links && (
        <Links
          loginLink={signupManager.screen.links.loginLink!}
        />
      )}

      {signupManager.transaction.hasErrors && signupManager.transaction.errors && (
        <ErrorMessages errors={signupManager.transaction.errors!} />
      )}
    </div>
  );
};

export default SignupScreen;
