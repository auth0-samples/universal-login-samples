import { useState } from 'react';
import ResetPassword from "@auth0/auth0-acul-js/reset-password";
import { withWindowDebug } from "../../../utils";

export const useResetPasswordManager = () => {
  const [resetPasswordManager] = useState(() => new ResetPassword());
  withWindowDebug(resetPasswordManager, 'resetPassword')

  const handleResetPassword = (newPassword: string, confirmPassword: string, captcha: string): void => {
    const options = {
      'password-reset': newPassword,
      're-enter-password': confirmPassword,
      captcha: resetPasswordManager.screen.isCaptchaAvailable ? captcha : "",
    };
    resetPasswordManager.resetPassword(options);
  };

  return {
    resetPasswordManager,
    handleResetPassword
  };
};

