import React, { useState } from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import { Logo } from '../../components/Logo';

const MfaPushEnrollmentQrScreen: React.FC = () => {
  const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
  const [copySuccess, setCopySuccess] = useState(false);
  const { screen } = mfaPushEnrollmentQr;
  const { qrCode, qrUri, showCodeCopy } = screen.data || {};
  const screenTexts = screen.texts!;

  // Handlers
  const handlePickAuthenticator = async () => {
    try {
      await mfaPushEnrollmentQr.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  const handleCopyCode = () => {
    if (qrUri) {
      navigator.clipboard.writeText(qrUri)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((error) => {
          console.error('Failed to copy code:', error);
        });
    }
  };

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />
      
      {/* Title */}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1>{screenTexts?.title ?? 'Enroll with Push Notification'}</h1>
        <p>{screenTexts?.description ?? ''}</p>
      </div>

      {/* QR Code Section */}
      <div className="input-container">
        {qrCode ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src={qrCode} alt="QR Code" style={{ margin: '0 auto', display: 'block' }} />
            </div>

            {showCodeCopy && (
              <div className="button-container">
                <button onClick={handleCopyCode}>
                  {copySuccess ? 'Copied!' : 'Copy as Code'}
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>Loading QR Code...</p>
        )}
      </div>

      {/* Links */}
      <div className="links">
        <a href="#" onClick={(e) => { e.preventDefault(); handlePickAuthenticator(); }}>
          Try another method
        </a>
      </div>

      {/* Error Messages */}
      {mfaPushEnrollmentQr.transaction.hasErrors && mfaPushEnrollmentQr.transaction.errors && (
        <div className="error-container">
          {mfaPushEnrollmentQr.transaction.errors.map((error: any, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MfaPushEnrollmentQrScreen;