import { useState } from 'react';
import ResetPasswordRequestInstance from "@auth0/auth0-acul-js/reset-password-request";
import { ResetPasswordRequestOptions } from "@auth0/auth0-acul-js/reset-password-request";
import { withWindowDebug } from "../../../utils";

export const useResetPasswordRequestManager = () => {
  const resetPasswordRequestInstance  = new ResetPasswordRequestInstance()
  const [resetPasswordRequestManager] = useState(resetPasswordRequestInstance);
  withWindowDebug(resetPasswordRequestInstance, 'resetPasswordRequest')

  const continueWithIdentifier = (options: ResetPasswordRequestOptions): void => {
    const payload: ResetPasswordRequestOptions = {
      username: options.username
    }
    resetPasswordRequestManager.resetPassword(payload);
  };

  const backToLogin = () => {
    resetPasswordRequestManager.backToLogin();
  };

  return {
    resetPasswordRequestManager,
    continueWithIdentifier,
    backToLogin
  };
};

