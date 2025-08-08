// LoginIdScreen.tsx
import React, { useRef, useState } from 'react';
import {  useScreen, useTransaction, login, federatedLogin, passkeyLogin } from '@auth0/auth0-acul-react/login-id';
import { Logo } from '../../components/Logo'; 

const LoginIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const usernameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleLoginClick = async () => {
    const username = usernameRef.current?.value ?? '';
    const captcha = captchaRef.current?.value ?? '';

    setIsLoading(true);
    setErrorMessages([]);

    try {
      await login({ username, captcha });
    } catch (err: any) {
      const message = err?.message || 'Login failed';
      setErrorMessages([message]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      setErrorMessages([err.message || 'Federated login failed']);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      await passkeyLogin({});
    } catch (err: any) {
      setErrorMessages([err.message || 'Passkey login failed']);
    }
  };

  return (
    <div className="prompt-container">
      <Logo />

      <h1>{screen.texts?.title || 'Welcome'}</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
        <div>
          <label>Username</label>
          <input type="text" ref={usernameRef} />
        </div>

        {screen.isCaptchaAvailable && (
          <div>
            <label>Captcha</label>
            {/* <img src={screen.captchaImage} alt="Captcha" /> */}
            <input type="text" ref={captchaRef} />
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
        <div>
          <h3>Login with Social</h3>
          {transaction.alternateConnections.map(conn => (
            <button key={conn.name} onClick={() => handleFederatedLogin(conn.name)}>
              Continue  {conn.name}
            </button>
          ))}
        </div>
      )}

      <div>
        <button onClick={handlePasskeyLogin}>Use Passkey</button>
      </div>

      {screen.signupLink && (
        <p><a href={screen.signupLink}>Sign Up</a></p>
      )}

      {screen.resetPasswordLink && (
        <p><a href={screen.resetPasswordLink}>Forgot Password?</a></p>
      )}

      {transaction.hasErrors && errorMessages.length > 0 && (
        <div style={{ color: 'red' }}>
          {errorMessages.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
      )}
    </div>
  );
};

export default LoginIdScreen;
