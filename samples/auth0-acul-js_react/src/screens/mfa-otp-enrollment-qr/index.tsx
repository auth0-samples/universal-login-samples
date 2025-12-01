import React, { useState } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const MfaOtpEnrollmentQrScreen: React.FC = () => {
  const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
  const { screen, transaction } = mfaOtpEnrollmentQr;
  const { qr_code } = screen.data || {};
  const screenTexts = screen?.texts;

  const [otpCode, setOtpCode] = useState('');

  const handleToggleView = async () => {
    try {
      await mfaOtpEnrollmentQr.toggleView();
    } catch (error) {
      console.error('Failed to toggle view:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaOtpEnrollmentQr.tryAnotherMethod();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  const handleContinue = async () => {
    await mfaOtpEnrollmentQr.continue({ code: otpCode });
  };

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />

      {/* Title */}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1>{screenTexts?.title ?? 'Secure Your Account'}</h1>
        <p>{screenTexts?.description ?? 'Scan the QR Code below using your preferred authenticator app and then enter the provided one-time code below.'}</p>
      </div>

      {/* QR Code Display */}
      <div className="input-container">
        {qr_code ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <img src={qr_code} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Loading QR Code...</p>
        )}

        {/* Toggle View Link */}
        <div className="links" style={{ marginBottom: '1.5rem' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleToggleView();
            }}
          >
            {screenTexts?.codeEnrollmentText ?? 'Trouble Scanning?'}
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
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder={screenTexts?.placeholder ?? 'Enter OTP code'}
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
          {screenTexts?.tryAnotherMethodText ?? 'Try Another Method'}
        </a>
      </div>

      {/* Error Messages */}
      {transaction?.errors?.length && (
        <div className="error-container">
          {transaction.errors.map((err, index) => (
            <p key={index}>{err.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MfaOtpEnrollmentQrScreen;
