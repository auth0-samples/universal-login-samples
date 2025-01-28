import { useState } from 'react';
import ResetPasswordSuccess from "@auth0/auth0-acul-js/reset-password-error";
import { withWindowDebug } from "../../../utils";

export const useResetPasswordSuccessManager = () => {
  const [resetPasswordSuccessManager] = useState(() => new ResetPasswordSuccess());
  withWindowDebug(resetPasswordSuccessManager, 'resetPasswordSuccess')

  return {
    resetPasswordSuccessManager
  };
};

