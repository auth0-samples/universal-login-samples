import { useEffect, useState } from 'react';
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";

export const useLoginManager = () => {
  const [loginManager] = useState(() => new LoginIdInstance());

  useEffect(() => {
    (async () => {
      await loginManager.registerPasskeyAutofill('username');
    })();
  }, []);
    
  const handleLogin = (username: string, captcha: string): void => {
    const options = {
      username,
      captcha: loginManager.screen.isCaptchaAvailable ? captcha : "",
    };
    loginManager.login(options);
  };

  const handleSocialConnectionLogin = (connectionName: string) => {
    loginManager.federatedLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    loginManager.passkeyLogin();
  };

  return {
    loginManager,
    handleLogin,
    handleSocialConnectionLogin,
    handlePasskeyLogin,
  };
};

