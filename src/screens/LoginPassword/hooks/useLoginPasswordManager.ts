import { useState } from 'react';
import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";

export const useLoginPasswordManager = () => {
  const [loginPasswordManager] = useState(() => new LoginPasswordInstance());

  const username = loginPasswordManager.untrustedData.getAuthParams()?.loginHint || "";
  const isCaptchaAvailable = loginPasswordManager.screen.isCaptchaAvailable;
  const captchaImage = loginPasswordManager.screen.captchaImage;
  const screenLinks = loginPasswordManager.screen.getScreenLinks();
  const { signupLink, resetPasswordLink } = loginPasswordManager.screen;
  const errors = loginPasswordManager.transaction.hasErrors ? loginPasswordManager.transaction.getErrors() : null;

  const login = (options: { username: string; password: string; captcha: string }) => {
    loginPasswordManager.login(options);
  };

  return {
    username,
    isCaptchaAvailable,
    captchaImage,
    screenLinks,
    signupLink,
    resetPasswordLink,
    errors,
    login
  };
}; 