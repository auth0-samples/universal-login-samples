import React, { useState } from "react";
import LoginIdInstance from "auth0-acul-js/login-id";
import { LoginView } from '../../components/LoginView';

const IkeaLogin: React.FC = () => {
  const [loginIdManager] = useState(() => new LoginIdInstance());

  

  const handleContinue = (username: string, captcha: string) => {
   loginIdManager.login({username, captcha: loginIdManager.screen.isCaptchaAvailable ? captcha : ""})
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginIdManager.socialLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginIdManager.passkeyLogin()
  };

  return (
    <LoginView
      loginIdManager={loginIdManager}
      onContinue={handleContinue}
      onPasskeyLogin={handlePasskeyLogin}
      onSocialLogin={handleSocialConnectionLogin}
    />
  );
};

export default IkeaLogin;