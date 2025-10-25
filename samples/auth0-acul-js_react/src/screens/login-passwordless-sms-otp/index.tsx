import React, { useState } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { Logo } from '../../components/Logo';
import '../../styles/screens/login-passwordless-sms-otp.scss';

const LoginPasswordlessSmsOtpScreen: React.FC = () => {
  const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();

  const username = loginPasswordlessSmsOtp.screen.data?.username || '';
  const screenTexts = loginPasswordlessSmsOtp.screen.texts

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      if (username) {
        await loginPasswordlessSmsOtp.submitOTP({ code: otp, username });
      } else {
        await loginPasswordlessSmsOtp.submitOTP({ code: otp });
      }
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
      setError(errorMessage);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess(false);
    setResent(false);
    try {
      if (username) {
        await loginPasswordlessSmsOtp.resendOTP({ username });
      } else {
        await loginPasswordlessSmsOtp.resendOTP();
      }
      setResent(true);
    } catch {
      setError('Failed to resend OTP. Please try again later.');
    }
  };

  const handleEdit = () => {
    const editLink = loginPasswordlessSmsOtp.screen.links?.edit_identifier;
    if (editLink) {
      // Navigate to edit identifier screen
      window.location.href = editLink;
    }
  };

  return (
    <div className="prompt-container login-passwordless-sms-otp-container">
      {/* Logo */}
      <Logo />

      {/* Title */}
      <div className="title-container">
        <h1>{screenTexts?.title}</h1>
        {screenTexts?.description && (
          <p>{screenTexts.description}</p>
        )}
      </div>

      {/* Username Display with Edit Button */}
      {username && (
        <div className="username-display">
          <span className="username-text">{username}</span>
          <button onClick={handleEdit} className="edit-button">
            {screenTexts?.editText}
          </button>
        </div>
      )}

      {/* OTP Form */}
      <form className="input-container" onSubmit={handleSubmit}>
        <label htmlFor="otp">{screenTexts?.placeholder}</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder={screenTexts?.placeholder}
          required
          className="otp-input"
        />

        <div className="button-container">
          <button id="continue" type="submit">{screenTexts?.buttonText}</button>
        </div>
      </form>

      {/* Resend Section */}
      <div className="resend-section">
        <span className="resend-text">{screenTexts?.resendText} </span>
        <button onClick={handleResend} className="resend-button">
          {screenTexts?.resendActionText}
        </button>
      </div>

      {/* Success Messages */}
      {success && (
        <div className="error-container">
          <p className="success-message">Login successful!</p>
        </div>
      )}

      {resent && (
        <div className="error-container">
          <p className="info-message">OTP resent to your phone.</p>
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

export default LoginPasswordlessSmsOtpScreen;
