import { useState } from 'react';
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";

export const useLoginIdManager = () => {
  const [loginIdManager] = useState(() => new LoginIdInstance());

  const handleLogin = (username: string, captcha: string): void => {
    const options = {
      username,
      captcha: loginIdManager.screen.isCaptchaAvailable ? captcha : "",
    };
    loginIdManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginIdManager.socialLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginIdManager.passkeyLogin();
  };

  return {
    loginIdManager,
    handleLogin,
    handleSocialConnectionLogin,
    handlePasskeyLogin,
  };
};

