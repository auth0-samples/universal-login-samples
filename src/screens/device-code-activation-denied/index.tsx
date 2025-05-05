import React from 'react';
import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';

const DeviceCodeActivationDeniedScreen: React.FC = () => {
  const deviceCodeActivationDeniedManager = new DeviceCodeActivationDenied();
  const { screen, transaction: { errors } } = deviceCodeActivationDeniedManager;
  const texts = screen.texts ?? {};

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          {texts.eventTitle ?? 'Device Code Activation Denied'}
        </h2>
        <p className="text-gray-700 mb-4">
          {texts.description ?? 'We are not able to activate your device.'}
        </p>

        {errors?.length && (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCodeActivationDeniedScreen;
