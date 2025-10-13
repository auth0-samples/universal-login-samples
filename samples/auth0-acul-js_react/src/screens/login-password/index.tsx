import React from "react";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";
import { Logo } from "../../components/Logo";
import { LoginForm } from "./components/LoginForm";
import { FederatedLogin } from "./components/FederatedLogin";
import { Links } from "./components/Links";
import { ErrorMessages } from "./components/ErrorMessages";
import "../../styles/screens/login-password.scss";

const LoginPasswordScreen: React.FC = () => {
  const {
    username,
    isCaptchaAvailable,
    captchaImage,
    screenLinks,
    signupLink,
    resetPasswordLink,
    errors,
    login,
    loginPasswordManager,
    handleSocialConnectionLogin
  } = useLoginPasswordManager();

  const handleSubmit = (password: string, captcha: string) => {
    login({ username, password, captcha });
  };

  return (
    <div className="prompt-container">
      <Logo />
      <LoginForm
        username={username}
        isCaptchaAvailable={isCaptchaAvailable}
        captchaImage={captchaImage!}
        onSubmit={handleSubmit}
      />

      <FederatedLogin
        connections={loginPasswordManager.transaction.alternateConnections!}
        onFederatedLogin={handleSocialConnectionLogin}
      />

      {screenLinks && <Links signupLink={signupLink!} resetPasswordLink={resetPasswordLink!} />}
      {errors && <ErrorMessages errors={errors} />}
    </div>
  );
};

export default LoginPasswordScreen;
