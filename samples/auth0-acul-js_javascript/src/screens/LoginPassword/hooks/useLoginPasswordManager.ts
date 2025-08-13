import { useState } from 'react';
import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";

export const useLoginPasswordManager = () => {
  const [loginPasswordManager] = useState(() => new LoginPasswordInstance());

  const username = loginPasswordManager.screen.data?.username || "";
  const isCaptchaAvailable = loginPasswordManager.screen.isCaptchaAvailable;
  const captchaImage = loginPasswordManager.screen.captchaImage;
  const screenLinks = loginPasswordManager.screen.links;
  const { signupLink, resetPasswordLink } = loginPasswordManager.screen;
  const errors = loginPasswordManager.transaction.hasErrors ? loginPasswordManager.transaction.errors : null;

  const login = (options: { username: string; password: string; captcha: string }) => {
    loginPasswordManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginPasswordManager.federatedLogin({ connection: connectionName });
  };

  return {
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
  };
};