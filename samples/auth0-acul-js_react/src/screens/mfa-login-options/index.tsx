import React, { useCallback } from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-login-options';
import { MfaLoginFactorType } from '@auth0/auth0-acul-react/types'
import { Logo } from '../../components/Logo';

/** Enum for Factor Types */
enum FactorTypeEnum {
  PUSH_NOTIFICATION = 'push-notification',
  OTP = 'otp',
  SMS = 'sms',
  PHONE = 'phone',
  VOICE = 'voice',
  EMAIL = 'email',
  RECOVERY_CODE = 'recovery-code',
  WEBAUTHN_ROAMING = 'webauthn-roaming',
  WEBAUTHN_PLATFORM = 'webauthn-platform',
  DUO = 'duo'
}

const MfaLoginOptionsScreen: React.FC = () => {
  const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
  const { tenant, screen: { texts } } = mfaBeginEnrollOptions;

  /** Dynamically map factor IDs to display names */
  const factorDisplayNames: Record<MfaLoginFactorType, string> = {
    [FactorTypeEnum.PUSH_NOTIFICATION]: texts?.authenticatorNamesPushNotification ?? 'Push Notification (Auth0 Guardian)',
    [FactorTypeEnum.OTP]: texts?.authenticatorNamesOTP ?? 'One-Time Password (Google Authenticator)',
    [FactorTypeEnum.SMS]: texts?.authenticatorNamesSMS ?? 'SMS',
    [FactorTypeEnum.PHONE]: texts?.authenticatorNamesPhone ?? 'Phone Call',
    [FactorTypeEnum.VOICE]: texts?.authenticatorNamesVoice ?? 'Voice Call',
    [FactorTypeEnum.EMAIL]: texts?.authenticatorNamesEmail ?? 'Email',
    [FactorTypeEnum.RECOVERY_CODE]: texts?.authenticatorNamesRecoveryCode ?? 'Recovery Code',
    [FactorTypeEnum.WEBAUTHN_PLATFORM]: texts?.authenticatorNamesWebauthnPlatform ?? 'Platform Authenticator',
    [FactorTypeEnum.WEBAUTHN_ROAMING]: texts?.authenticatorNamesWebauthnRoaming ?? 'Security Key',
    [FactorTypeEnum.DUO]: texts?.authenticatorNamesDuo ?? 'Notification via DUO app'
  };

  /** Handles user selection of an MFA factor */
  const handleFactorSelection = useCallback(async (factor: MfaLoginFactorType) => {
    try {
      await mfaBeginEnrollOptions.enroll({
        action: factor as MfaLoginFactorType
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
        {tenant.enabledFactors?.map((factor) => {
          const factorEnum = factor as MfaLoginFactorType;
          return (
            <div key={factor} className="button-container">
              <button onClick={() => handleFactorSelection(factorEnum)}>
                {factorDisplayNames[factorEnum]}
              </button>
            </div>
          );
        })}
      </div>

      {/* Error Messages */}
      {mfaBeginEnrollOptions.transaction.hasErrors && mfaBeginEnrollOptions.transaction.errors && (
        <div className="error-container">
          {mfaBeginEnrollOptions.transaction.errors.map((error: any, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MfaLoginOptionsScreen;