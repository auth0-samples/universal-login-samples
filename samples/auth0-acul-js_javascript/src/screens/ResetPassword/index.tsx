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
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<Array<{ code: string; message: string }>>([]); 

  const onLoginClick = () => {
    const { newPassword, confirmPassword, captcha } = getFormValues();
    const { isValid, errors } = resetPasswordManager.validatePassword(newPassword);
    const { isValid: isValidConfirmPassword, errors:confirmPasswordErrors } = resetPasswordManager.validatePassword(confirmPassword);


    setIsValid(isValid);
    setErrors(errors);
    setIsValidConfirmPassword(isValidConfirmPassword);
    setConfirmPasswordErrors(confirmPasswordErrors);
    if (!isValid || !isValidConfirmPassword) {
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
        isValid={isValid}
        isValidConfirmPassword={isValidConfirmPassword}
        confirmPasswordErrors={confirmPasswordErrors}
        errors={errors}
      />

      {resetPasswordManager.transaction.hasErrors && resetPasswordManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;
