import { useState } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/login";
import { withWindowDebug } from "../../../utils";

export const useLoginManager = () => {
  const [loginIdManager] = useState(() => new LoginInstance());
  withWindowDebug(loginIdManager, 'login')

  const errors = loginIdManager.getErrors();

  const handleLogin = (username: string, password: string, captcha: string): void => {
    const options = {
      username,
      password,
      captcha: loginIdManager.screen.isCaptchaAvailable ? captcha : "",
    };
    loginIdManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginIdManager.federatedLogin({ connection: connectionName });
  };

  return {
    loginIdManager,
    handleLogin,
    handleSocialConnectionLogin,
    errors
  };
};

