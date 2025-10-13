import React, { useState } from 'react';
import { useSignupManager } from './hooks/useSignupManager';
import { Logo } from '../../components/Logo';
import { Title } from './components/Title';
import { SignupForm } from './components/signupForm';
import { FederatedLogin } from './components/FederatedLogin';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { signupManager, handleSignup, handleSocialSignup } = useSignupManager();
  const identifiers = signupManager.getSignupIdentifiers();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const passwordValidation = signupManager.validatePassword(password);
  const usernameValidation = signupManager.validateUsername(username);

  const onSubmit = () => {
    if (!passwordValidation.isValid || !usernameValidation.isValid) return;
    handleSignup(username, email, phoneNumber, password, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={signupManager.screen.texts!} />

      <SignupForm
        email={email}
        username={username}
        phoneNumber={phoneNumber}
        password={password}
        captcha={captcha}
        isCaptchaAvailable={signupManager.screen.isCaptchaAvailable}
        captchaImage={signupManager.screen.captchaImage}
        countryCode={signupManager.transaction.countryCode}
        countryPrefix={signupManager.transaction.countryPrefix}
        identifiers={identifiers}
        passwordValidation={passwordValidation}
        usernameValidation={usernameValidation}
        setEmail={setEmail}
        setUsername={setUsername}
        setPhoneNumber={setPhoneNumber}
        setPassword={setPassword}
        setCaptcha={setCaptcha}
        onSubmit={onSubmit}
      />

      <FederatedLogin
        connections={signupManager.transaction.alternateConnections}
        onFederatedLogin={handleSocialSignup}
      />


      {signupManager.screen.links?.login && (
          <Links loginLink={signupManager.screen.links.login} />
      )}


      {signupManager.transaction.hasErrors && (
        <ErrorMessages errors={signupManager.transaction.errors} />
      )}
    </div>
  );
};

export default SignupScreen;
