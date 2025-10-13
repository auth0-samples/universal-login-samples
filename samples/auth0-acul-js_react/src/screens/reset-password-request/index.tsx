import React from "react";
import { useResetPasswordRequestManager } from './hooks/useResetPasswordRequestManager';
import { useResetPasswordRequestForm } from './hooks/useResetPasswordRequestForm';
import { Logo } from "../../components/Logo";
import { Title } from '../../components/Title';
import { ResetPasswordRequest } from './components/ResetPasswordRequest';
import { Links } from '../../components/Links';
import { ErrorMessages } from '../../components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { resetPasswordRequestManager, continueWithIdentifier, backToLogin } = useResetPasswordRequestManager();
  const { usernameRef, getFormValues } = useResetPasswordRequestForm();

  const onUserLoginClick = () => {
    const { username } = getFormValues();
    continueWithIdentifier({username});
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordRequestManager.screen.texts!} />
      
      <ResetPasswordRequest
        usernameRef={usernameRef}
        onLoginClick={onUserLoginClick}
        onBackClick={backToLogin}
      />
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

export default SignupScreen;
