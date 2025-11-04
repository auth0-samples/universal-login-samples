import React, { useState } from "react";
import ResetPasswordSuccess from "@auth0/auth0-acul-js/reset-password-success";
import { withWindowDebug } from "../../utils";
import { Logo } from "../../components/Logo";

const ResetPasswordSuccessScreen: React.FC = () => {
  // Manager setup
  const [resetPasswordSuccessManager] = useState(() => new ResetPasswordSuccess());
  withWindowDebug(resetPasswordSuccessManager, 'resetPasswordSuccess');

  return (
    <div className="prompt-container">
      <Logo />
      <div className="title-container">
        <h1>{resetPasswordSuccessManager.screen.texts?.title}</h1>
        <p>{resetPasswordSuccessManager.screen.texts?.description}</p>
      </div>

      {resetPasswordSuccessManager.transaction.hasErrors && resetPasswordSuccessManager.transaction.errors && (
        <div className="error-container">
          {resetPasswordSuccessManager.transaction.errors.map((error: any, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordSuccessScreen;
