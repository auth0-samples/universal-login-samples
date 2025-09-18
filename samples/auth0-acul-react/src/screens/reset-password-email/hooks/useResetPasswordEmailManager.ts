import { useState } from 'react';
import ResetPasswordEmailInstance from "@auth0/auth0-acul-js/reset-password-email";
import { withWindowDebug } from "../../../utils";

export const useResetPasswordRequestManager = () => {
  const resetPasswordEmailInstance  = new ResetPasswordEmailInstance()
  const [resetPasswordRequestManager] = useState(resetPasswordEmailInstance);
  withWindowDebug(resetPasswordEmailInstance, 'resetPasswordEmail')

  const resendEmail = (): void => {
    resetPasswordRequestManager.resendEmail();
  };

  const getScreenText = () => {
    return {
      title: resetPasswordRequestManager.screen.texts?.title || 'Check Your Email',
      description: resetPasswordRequestManager.screen.texts?.usernameDescription || 'We sent a password reset link to your email'
    }
  };

  return {
    resetPasswordRequestManager,
    resendEmail,
    getScreenText
  };
};

