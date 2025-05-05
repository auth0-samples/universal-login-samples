import React from 'react';
import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';

const DeviceCodeActivationAllowedScreen: React.FC = () => {
  const deviceCodeActivationAllowedManager = new DeviceCodeActivationAllowed();
  const { screen, transaction: { errors } } = deviceCodeActivationAllowedManager;
  const texts = screen.texts ?? {};

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          {texts.eventTitle ?? 'Congratulations, you\'re all set!'}
        </h2>
        <p className="text-gray-700 mb-4">
          {texts.description ?? 'Your device is now connected.'}
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

export default DeviceCodeActivationAllowedScreen;
