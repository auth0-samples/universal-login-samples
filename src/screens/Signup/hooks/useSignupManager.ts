import { useState } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/signup";
import { withWindowDebug } from "../../../utils";

export const useSignupManager = () => {
  const [signupManager] = useState(() => new LoginInstance());
    withWindowDebug(signupManager, 'signup')

  const handleSignup = (username: string, email: string, phoneNumber: string,  password: string, captcha: string): void => {
    const options = {
      username,
      email,
      phoneNumber,
      password,
      captcha: signupManager.screen.isCaptchaAvailable ? captcha : "",
    };
    signupManager.signup(options);
  };

  const handleSocialSignup = (connectionName: string) => {
    signupManager.socialSignup({ connection: connectionName });
  };

  return {
    signupManager,
    handleSignup,
    handleSocialSignup
  };
};

