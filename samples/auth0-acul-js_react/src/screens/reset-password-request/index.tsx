import React, { useState, useRef } from "react";
import ResetPasswordRequestInstance from "@auth0/auth0-acul-js/reset-password-request";
import { ResetPasswordRequestOptions } from "@auth0/auth0-acul-js/reset-password-request";
import { withWindowDebug } from "../../utils";
import { Logo } from "../../components/Logo";
import { Title } from '../../components/Title';
import Button from '../../components/Button';
import { Links } from '../../components/Links';
import { ErrorMessages } from '../../components/ErrorMessages';

const ResetPasswordRequestScreen: React.FC = () => {
  // Manager setup
  const resetPasswordRequestInstance = new ResetPasswordRequestInstance();
  const [resetPasswordRequestManager] = useState(resetPasswordRequestInstance);
  withWindowDebug(resetPasswordRequestInstance, 'resetPasswordRequest');

  // Form refs
  const usernameRef = useRef<HTMLInputElement>(null);

  // Actions
  const continueWithIdentifier = (options: ResetPasswordRequestOptions): void => {
    resetPasswordRequestManager.resetPassword(options);
  };

  const backToLogin = () => {
    resetPasswordRequestManager.backToLogin();
  };

  const onUserLoginClick = () => {
    const username = usernameRef.current?.value ?? "";
    continueWithIdentifier({ username });
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordRequestManager.screen.texts!} />

      <div className="input-container">
        <label>Phone number or Email address</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder="Phone number or Email address"
        />
        <div className="button-container">
          <Button onClick={onUserLoginClick}>Continue</Button>
        </div>
        <div className="button-container">
          <Button onClick={backToLogin}>Back To My App</Button>
        </div>
      </div>

      {resetPasswordRequestManager.screen.links && (
        <Links
          loginLink={resetPasswordRequestManager.screen.links.loginLink!}
        />
      )}

      {resetPasswordRequestManager.transaction.hasErrors && resetPasswordRequestManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordRequestManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordRequestScreen;
