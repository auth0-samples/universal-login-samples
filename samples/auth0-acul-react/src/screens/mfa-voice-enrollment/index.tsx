import React, { useState } from 'react';
import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import { useMfaVoiceEnrollment, tryAnotherMethod, continueMethod, selectPhoneCountryCode } from '@auth0/auth0-acul-react/mfa-voice-enrollment';
import { Logo } from '../../components/Logo';

const MfaVoiceEnrollmentScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const mfaVoiceEnrollment = useMfaVoiceEnrollment();
  const { screen, transaction: { errors } } = mfaVoiceEnrollment;
  const texts = screen.texts ?? {};

  const handlePickCountryCode = async () => {
    await selectPhoneCountryCode();
  };

  const handleContinueEnrollment = async () => {
    await continueMethod({ phone });
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Existing content */}
        <h2 className="mt-6 text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Secure Your Account'}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {texts.description ?? 'Enter your phone number below. A voice call will be placed on that number with a code to enter on the next screen.'}
        </p>

        <button
          className="w-full mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handlePickCountryCode}
        >
          {texts.pickCountryCodeButtonText ?? 'Pick Country Code'}
        </button>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            {texts.placeholder ?? 'Enter your phone number'}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder={texts.placeholder ?? 'Enter your phone number'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors?.length && (
            <div className="mt-2 space-y-1">
              {errors.map((error, idx) => (
                <p key={idx} className="text-red-600 text-sm">
                  {error.message}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          type="button"
          onClick={handleContinueEnrollment}
        >
          {texts.buttonText ?? 'Continue'}
        </button>

        <button
          className="text-sm text-blue-500 hover:underline focus:outline-none"
          type="button"
          onClick={handleTryAnotherMethod}
        >
          {texts.pickAuthenticatorText ?? 'Try another method'}
        </button>
      </div>
    </div>
  );
};

export default MfaVoiceEnrollmentScreen;