import React from "react";
import { useResetPasswordErrorManager } from './hooks/useResetPasswordErrorManager';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { ErrorMessages } from './components/ErrorMessages';

const ResetPasswordScreen: React.FC = () => {
  const { resetPasswordErrorManager } = useResetPasswordErrorManager();

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordErrorManager.screen.texts!} />
      
      <p>{ resetPasswordErrorManager.screen.texts?.description }</p>

      {resetPasswordErrorManager.transaction.hasErrors && resetPasswordErrorManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordErrorManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;
