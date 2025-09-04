import React, { useState } from "react";
import { useSignupManager } from './hooks/useSignupManager';
import { useSignupForm } from './hooks/useSignupForm';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { LoginForm } from './components/LoginForm';
import { FederatedLogin } from './components/FederatedLogin';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { signupManager, handleSignup, handleSocialSignup } = useSignupManager();
  const identifiers = signupManager.getEnabledIdentifiers();
  const { emailRef, usernameRef, phoneNumberRef, passwordRef, captchaRef, getFormValues } = useSignupForm();

  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [passwordValidation, setPasswordValidation] = useState<Array<{ code: string; policy: string; isValid: boolean }>>([]); // NEW
  const [hasTypedPassword, setHasTypedPassword] = useState(false); 

  const onPasswordChange = (password: string) => {
    if (!hasTypedPassword && password.length > 0) {
    setHasTypedPassword(true);
  }

    const results = signupManager.validatePassword(password);
    setPasswordValidation(results);

    const failedRules = results.filter(r => !r.isValid);
    setIsValid(failedRules.length === 0);
    setErrors(failedRules.map(r => ({ code: r.code, message: r.policy })));
  };

  const onLoginClick = () => {
    const { username, email, phoneNumber, password, captcha } = getFormValues();
    const results = signupManager.validatePassword(password);
    const failed = results.filter(rule => !rule.isValid);

    const isValid = failed.length === 0;
    const errors = failed.map(rule => ({
      code: rule.code,
      message: rule.policy
    }));

    setIsValid(isValid);
    setErrors(errors);
    if (!isValid) return;

    handleSignup(username, email, phoneNumber, password, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={signupManager.screen.texts!} />

      <LoginForm
        emailRef={emailRef}
        usernameRef={usernameRef}
        phoneNumberRef={phoneNumberRef}
        passwordRef={passwordRef}
        captchaRef={captchaRef}
        isCaptchaAvailable={signupManager.screen.isCaptchaAvailable}
        captchaImage={signupManager.screen.captchaImage!}
        countryCode={signupManager.transaction.countryCode!}
        countryPrefix={signupManager.transaction.countryPrefix!}
        onLoginClick={onLoginClick}
        isValid={isValid}
        errors={errors}
        identifiers={identifiers}
        passwordValidation={passwordValidation} // NEW
        onPasswordChange={onPasswordChange}     // NEW
        hasTypedPassword={hasTypedPassword}
      />

      <FederatedLogin
        connections={signupManager.transaction.alternateConnections!}
        onFederatedLogin={handleSocialSignup}
      />

      {signupManager.screen.links && (
        <Links loginLink={signupManager.screen.links.loginLink!} />
      )}

      {signupManager.transaction.hasErrors && signupManager.transaction.errors && (
        <ErrorMessages errors={signupManager.transaction.errors!} />
      )}
    </div>
  );
};
export default SignupScreen;