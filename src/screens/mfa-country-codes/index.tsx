import React from 'react';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';

const MfaCountryCodesScreen: React.FC = () => {
  const mfaCountryCodes = new MfaCountryCodes();
  const { screen } = mfaCountryCodes;
  const { phone_prefixes } = screen.data || {};
  const handleCountrySelect = async (countryCode: string, phonePrefix: string) => {
    try {
      await mfaCountryCodes.selectCountryCode({
       country_code: countryCode,
       phone_prefix: phonePrefix
      });
    } catch (error) {
      console.error('Failed to select country code:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await mfaCountryCodes.goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Select Your Country Code
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {phone_prefixes?.map((prefix, index) => (
              <button
                key={`${prefix.country_code}${index}`}
                onClick={() => handleCountrySelect(prefix.country_code, prefix.phone_prefix)}
                className="w-full flex justify-between items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span>{prefix.country}</span>
                <span className="text-gray-500">{prefix.phone_prefix}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoBack}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaCountryCodesScreen;