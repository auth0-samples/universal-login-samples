import React, { useState } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const MfaOtpEnrollmentCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');

  const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
  const { screen, transaction } = mfaOtpEnrollmentCode;
  const screenTexts = screen?.texts;

  const handleContinue = () => {
    mfaOtpEnrollmentCode.continue({ code });
  };

  // const handleToggleView = async () => {
  //   try {
  //     await mfaOtpEnrollmentCode.toggleView();
  //   } catch (error) {
  //     console.error('Failed to toggle view:', error);
  //   }
  // };

  const handleTryAnotherMethod = async () => {
    await mfaOtpEnrollmentCode.tryAnotherMethod();
  };

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />

      {/* Title */}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1>{screenTexts?.title ?? 'Secure Your Account'}</h1>
        <p>{screenTexts?.description ?? 'Manually enter the following code into your preferred authenticator app and then enter the provided one-time code below.'}</p>
      </div>

      {/* Code Display */}
      <div className="input-container">
        <div style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.25rem',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: '600',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
          wordBreak: 'break-all',
          overflowWrap: 'break-word'
        }}>
          {screen.data?.text_code}
        </div>

        {/* Copy Code Button */}
        <div className="button-container" style={{ marginBottom: '1rem' }}>
          <button
            className="button"
            style={{ backgroundColor: 'white', color: '#673ab7', border: '1px solid #673ab7' }}
            onClick={() => {
              navigator.clipboard.writeText(screen.data?.text_code || '');
            }}
          >
            {screenTexts?.copyCodeButtonText ?? 'Copy code'}
          </button>
        </div>

        {/* Toggle View Link */}
        <div className="links" style={{ marginBottom: '1.5rem' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // handleToggleView();
            }}
          >
            {screenTexts?.scanQrCodeInstead ?? 'Scan QR code instead'}
          </a>
        </div>

        {/* Separator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          margin: '1.5rem 0',
          textAlign: 'center'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ededed' }}></div>
          <span style={{ padding: '0 1rem', color: '#666', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            {screenTexts?.separatorText ?? 'Then'}
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ededed' }}></div>
        </div>

        {/* OTP Input */}
        <label>{screenTexts?.placeholder ?? 'Enter your one-time code'}</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={screenTexts?.placeholder ?? 'Enter your one-time code'}
        />

        {/* Continue Button */}
        <div className="button-container">
          <Button onClick={handleContinue}>
            {screenTexts?.buttonText ?? 'Continue'}
          </Button>
        </div>
      </div>

      {/* Try Another Method Link */}
      <div className="links">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleTryAnotherMethod();
          }}
        >
          {screenTexts?.pickAuthenticatorText ?? 'Try another method'}
        </a>
      </div>

      {/* Error Messages */}
      {transaction?.errors?.length && (
        <div className="error-container">
          {transaction.errors.map((error, index) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MfaOtpEnrollmentCodeScreen;