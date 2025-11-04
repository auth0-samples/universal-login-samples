import React from 'react';
import { useDeviceCodeActivationAllowed, useScreen } from '@auth0/auth0-acul-react/device-code-activation-allowed';
import { Logo } from '../../components/Logo';

const DeviceCodeActivationAllowedScreen: React.FC = () => {
  const deviceCodeActivationAllowedManager = useDeviceCodeActivationAllowed();
  const screen = useScreen();
  const { transaction: { errors } } = deviceCodeActivationAllowedManager;
  const texts = screen.texts ?? {};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          {texts.eventTitle ?? "Congratulations, you're all set!"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {texts.description ?? 'Your device is now connected.'}
        </p>
        {errors?.length && (
          <div className="mt-4 space-y-1 text-left" aria-live="polite">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-xs">{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCodeActivationAllowedScreen;
