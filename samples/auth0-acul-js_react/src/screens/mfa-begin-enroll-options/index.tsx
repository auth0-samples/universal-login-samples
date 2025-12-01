import React, { useCallback } from 'react';
import MfaBeginEnrollOptions, { type MfaEnrollFactorType } from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import { Logo } from '../../components/Logo';

/** Enum for Factor Types */
enum FactorTypeEnum {
  PUSH_NOTIFICATION = 'push-notification',
  OTP = 'otp',
  SMS = 'sms',
  PHONE = 'phone',
  VOICE = 'voice',
  WEBAUTHN_ROAMING = 'webauthn-roaming'
}

const MfaBeginEnrollOptionsScreen: React.FC = () => {
  const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
  const { tenant, screen: { texts } } = mfaBeginEnrollOptions;

  /** Dynamically map factor IDs to display names */
  const factorDisplayNames: Record<MfaEnrollFactorType, string> = {
    [FactorTypeEnum.PUSH_NOTIFICATION]: texts?.authenticatorNamesPushNotification ?? 'Push Notification (Auth0 Guardian)',
    [FactorTypeEnum.OTP]: texts?.authenticatorNamesOTP ?? 'One-Time Password (Google Authenticator)',
    [FactorTypeEnum.SMS]: texts?.authenticatorNamesSMS ?? 'SMS',
    [FactorTypeEnum.PHONE]: texts?.authenticatorNamesPhone ?? 'Phone Call',
    [FactorTypeEnum.VOICE]: texts?.authenticatorNamesVoice ?? 'Voice Call',
    [FactorTypeEnum.WEBAUTHN_ROAMING]: texts?.authenticatorNamesWebauthnRoaming ?? 'Security Key'
  };

  /** Handles user selection of an MFA factor */
  const handleFactorSelection = useCallback(async (factor: MfaEnrollFactorType) => {
    try {
      await mfaBeginEnrollOptions.enroll({
        action: factor as MfaEnrollFactorType
      });
    } catch (error) {
      console.error(`Error enrolling factor [${factor}]:`, error);
    }
  }, []);

  return (
    <div className="prompt-container">
      {/* Logo */}
      <Logo />

      {/* Title */}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1>{texts?.title ?? 'Multi-factor Authentication'}</h1>
        <p>{texts?.description ?? 'Choose a Multi-factor Authentication Method'}</p>
      </div>

      {/* Factor Options */}
      <div className="input-container">
        {tenant.enabledFactors?.map((factor, index) => {
          const factorEnum = factor as MfaEnrollFactorType;
          return (
            <div key={factor} className="button-container" style={{ marginTop: index === 0 ? '0' : '0.5rem' }}>
              <button
                className="button"
                style={{ backgroundColor: 'white', color: '#673ab7', border: '1px solid #673ab7' }}
                onClick={() => handleFactorSelection(factorEnum)}
              >
                {factorDisplayNames[factorEnum]}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MfaBeginEnrollOptionsScreen;
