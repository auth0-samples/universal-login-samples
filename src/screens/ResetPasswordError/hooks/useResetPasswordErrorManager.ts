import { useState } from 'react';
import ResetPasswordError from "@auth0/auth0-acul-js/reset-password-error";
import { withWindowDebug } from "../../../utils";

export const useResetPasswordErrorManager = () => {
  const [resetPasswordErrorManager] = useState(() => new ResetPasswordError());
  withWindowDebug(resetPasswordErrorManager, 'resetPasswordError')

  return {
    resetPasswordErrorManager
  };
};

