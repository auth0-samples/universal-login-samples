import React, { useCallback } from 'react';
import { useMfaBeginEnrollOptions, enroll } from '@auth0/auth0-acul-react/mfa-begin-enroll-options';
import { Logo } from '../../components/Logo';

type MfaEnrollFactorType = 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'webauthn-roaming';

const getFactorLabel = (factor: MfaEnrollFactorType, texts: any): string => {
  switch (factor) {
    case 'push-notification':
      return texts?.authenticatorNamesPushNotification ?? 'Push Notification (Auth0 Guardian)';
    case 'otp':
      return texts?.authenticatorNamesOTP ?? 'One-Time Password (Authenticator App)';
    case 'sms':
      return texts?.authenticatorNamesSMS ?? 'SMS';
    case 'phone':
      return texts?.authenticatorNamesPhone ?? 'Phone Call';
    case 'voice':
      return texts?.authenticatorNamesVoice ?? 'Voice Call';
    case 'webauthn-roaming':
      return texts?.authenticatorNamesWebauthnRoaming ?? 'Security Key';
    default:
      return factor;
  }
};

const MfaBeginEnrollOptionsScreen: React.FC = () => {
  const { tenant, screen: { texts } } = useMfaBeginEnrollOptions();

  const title = texts?.title ?? 'Set Up Multi‑Factor Authentication';
  const description = texts?.description ?? 'Select a method to add an extra layer of security to your account.';
  const heading = texts?.headingChooseMethod ?? 'Choose a Method';
  const enrollActionLabel = texts?.enrollActionLabel ?? 'Enroll';
  const footerHelpText = texts?.footerHelpText ?? 'You can add more methods later in your account security settings.';

  const enabledFactors = tenant?.enabledFactors ?? [];

  const handleFactorSelection = useCallback(async (factor: MfaEnrollFactorType) => {
    try {
      await enroll({ action: factor });
    } catch (error) {
      console.error(`Error enrolling factor [${factor}]`, error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {description}
        </p>

        <h3 className="mt-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
          {heading}
        </h3>

        <div className="mt-4 space-y-3">
          {enabledFactors.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              {texts?.noFactorsAvailable ?? 'No enrollment options available.'}
            </div>
          )}
          {enabledFactors.map((factor) => {
            const factorId = factor as MfaEnrollFactorType;
            const label = getFactorLabel(factorId, texts);
            return (
              <button
                key={factorId}
                onClick={() => handleFactorSelection(factorId)}
                className="w-full flex justify-between items-center py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                <span>{label}</span>
                <span className="text-indigo-600 text-xs font-semibold">{enrollActionLabel}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          {footerHelpText}
        </p>
      </div>
    </div>
  );
};

export default MfaBeginEnrollOptionsScreen;
