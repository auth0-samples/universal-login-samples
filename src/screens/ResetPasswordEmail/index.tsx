import React from "react";
import { useResetPasswordRequestManager } from './hooks/useResetPasswordEmailManager';
import { Logo } from "../../components/Logo";
import { Title } from '../../components/Title';
import { ResetPasswordRequest } from './components/ResetPasswordRequest';
import { Links } from '../../components/Links';
import { ErrorMessages } from '../../components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { resetPasswordRequestManager, resendEmail, getScreenText } = useResetPasswordRequestManager();

  const onUserLoginClick = () => {
    resendEmail();
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={getScreenText()} />
      
      <ResetPasswordRequest
        onLoginClick={onUserLoginClick}
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
