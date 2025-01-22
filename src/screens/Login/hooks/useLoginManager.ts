import { useState } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/login";

export const useLoginManager = () => {
  const [loginIdManager] = useState(() => new LoginInstance());

  const handleLogin = (username: string, password: string, captcha: string): void => {
    const options = {
      username,
      password,
      captcha: loginIdManager.screen.isCaptchaAvailable ? captcha : "",
    };
    loginIdManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginIdManager.socialLogin({ connection: connectionName });
  };

  return {
    loginIdManager,
    handleLogin,
    handleSocialConnectionLogin
  };
};

