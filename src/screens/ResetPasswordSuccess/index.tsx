import React from "react";
import { useResetPasswordSuccessManager } from './hooks/useResetPasswordSuccessManager';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { ErrorMessages } from './components/ErrorMessages';

const ResetPasswordScreen: React.FC = () => {
  const { resetPasswordSuccessManager } = useResetPasswordSuccessManager();

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordSuccessManager.screen.texts!} />
      
      <p>{ resetPasswordSuccessManager.screen.texts?.description }</p>

      {resetPasswordSuccessManager.transaction.hasErrors && resetPasswordSuccessManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordSuccessManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;
