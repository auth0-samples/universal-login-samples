import React, { useState } from "react";
import { useResetPasswordManager } from './hooks/useResetPasswordManager';
import { useLoginForm } from './hooks/useLoginForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { ErrorMessages } from './components/ErrorMessages';

const ResetPasswordScreen: React.FC = () => {
  const { resetPasswordManager, handleResetPassword } = useResetPasswordManager();
  const { newPasswordRef, confirmPasswordRef, captchaRef, getFormValues } = useLoginForm();
  const [password, setPassword] = useState('');
  const passwordValidation = resetPasswordManager.validatePassword(password);

  const onLoginClick = () => {
    const { newPassword, confirmPassword, captcha } = getFormValues();
    if (!passwordValidation.isValid) {
      // Handle password validation errors
      return;
    }

    handleResetPassword(newPassword, confirmPassword, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordManager.screen.texts!} />
      
      <LoginForm
        newPasswordRef={newPasswordRef}
        confirmPasswordRef={confirmPasswordRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={resetPasswordManager.screen.isCaptchaAvailable}
        captchaImage={resetPasswordManager.screen.captchaImage!}
        countryCode={resetPasswordManager.transaction.countryCode!}
        countryPrefix={resetPasswordManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
        isValid={passwordValidation.isValid}
        results={passwordValidation}
        setPassword={setPassword}
        password={password}
      />

      {resetPasswordManager.transaction.hasErrors && resetPasswordManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;
