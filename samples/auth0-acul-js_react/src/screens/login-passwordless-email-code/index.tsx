import React, { useState } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';
import '../../styles/screens/login-passwordless-email-code.scss';

const LoginPasswordlessEmailCodeScreen: React.FC = () => {
  const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();

  const email = loginPasswordlessEmailCode.screen.data?.username || '';
  const screenTexts = loginPasswordlessEmailCode.screen.texts;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);

    if (!email || !code) {
      setError('Email and code are required.');
      return;
    }

    try {
      await loginPasswordlessEmailCode.submitCode({ email, code });
      setSuccess(true);
    } catch {
      setError('Invalid code or email. Please try again.');
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess(false);
    setResent(false);
    try {
      await loginPasswordlessEmailCode.resendCode();
      setResent(true);
    } catch {
      setError('Failed to resend code. Please try again later.');
    }
  };

  const handleEdit = () => {
    const editLink = loginPasswordlessEmailCode.screen.links?.edit_identifier;
    if (editLink) {
      // Navigate to edit identifier screen
      window.location.href = editLink;
    }
  };

  // const handleSwitchConnection = async (connectionName: string) => {
  //   try {
  //     await loginPasswordlessEmailCode.switchConnection({ connection: connectionName });
  //   } catch {
  //     setError('Failed to switch connection. Please try again.');
  //   }
  // };

  return (
    <div className="prompt-container login-passwordless-email-code-container">
      {/* Logo */}
      <Logo />

      {/* Title */}
      <div className="title-container">
        <h1>{screenTexts?.title || 'Continue with Email Code'}</h1>
        <p>{screenTexts?.description || 'Enter the code sent to your email'}</p>
      </div>

      {/* Email Display with Edit Button */}
      {email && (
        <div className="email-display">
          <span className="email-text">{email}</span>
          <button onClick={handleEdit} className="edit-button">
            {screenTexts?.editText || 'Edit'}
          </button>
        </div>
      )}

      {/* Email Code Form */}
      <form className="input-container" onSubmit={handleSubmit}>
        <label htmlFor="code">{screenTexts?.placeholder || 'Enter the code'}</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={screenTexts?.placeholder || 'Enter the code'}
          required
          className="code-input"
        />

        <div className="button-container">
          <button id="continue" type="submit">{screenTexts?.buttonText || 'Continue'}</button>
        </div>
      </form>

      {/* Resend Section */}
      <div className="resend-section">
        <span className="resend-text">{screenTexts?.resendText || "Didn't receive a code?"} </span>
        <button onClick={handleResend} className="resend-button">
          {screenTexts?.resendActionText || 'Resend'}
        </button>
      </div>

      {/* Switch Connection Options */}
      {/* <div className="federated-login-container">
        <Button onClick={() => handleSwitchConnection('sms')}>
          Switch to SMS
        </Button>
      </div> */}

      {/* Success Messages */}
      {success && (
        <div className="error-container">
          <p className="success-message">Login successful!</p>
        </div>
      )}

      {resent && (
        <div className="error-container">
          <p className="info-message">Code resent to your email.</p>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPasswordlessEmailCodeScreen;