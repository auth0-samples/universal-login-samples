import { useState } from 'react';
import { useMfaSmsEnrollment, tryAnotherMethod, continueEnrollment, pickCountryCode } from '@auth0/auth0-acul-react/mfa-sms-enrollment';
import { Logo } from '../../components/Logo';

const MFASmsEnrollmentScreen = () => {
  const [phone, setPhone] = useState('');
  const mfaSmsEnrollment = useMfaSmsEnrollment();
  const { screen, transaction: { errors } } = mfaSmsEnrollment;
  const texts = screen?.texts || {};

  const handlePickCountryCode = async () => {
    await pickCountryCode();
  };

  const handleContinueEnrollment = async () => {
    await continueEnrollment({ phone });
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title || 'MFA SMS Enrollment'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description || 'Enter your phone number so we can send you verification codes.'}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {texts.placeholder || 'Phone Number'}
            </label>
            <input
              id="phone"
              type="text"
              placeholder={texts.placeholder || 'Enter your phone number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors?.length ? (
              <div className="mt-2 space-y-1" aria-live="polite">
                {errors.map((err, i) => (
                  <p key={i} className="text-red-600 text-xs">{err.message}</p>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleContinueEnrollment}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.continueButtonText || 'Continue'}
          </button>

          <button
            type="button"
            onClick={handlePickCountryCode}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {texts.pickCountryCodeButtonText || 'Pick Country Code'}
          </button>

          <button
            type="button"
            onClick={handleTryAnotherMethod}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {texts.pickAuthenticatorText || 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFASmsEnrollmentScreen;