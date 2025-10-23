import React from 'react';
import { useDeviceCodeActivationDenied, useScreen} from '@auth0/auth0-acul-react/device-code-activation-denied';
import { Logo } from '../../components/Logo';

const DeviceCodeActivationDeniedScreen: React.FC = () => {
  const deviceCodeActivationDeniedManager = useDeviceCodeActivationDenied();
  const screen = useScreen();
  const { transaction: { errors } } = deviceCodeActivationDeniedManager;
  const texts = screen.texts ?? {};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20"><Logo /></div>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          {texts.eventTitle ?? 'Device Code Activation Denied'}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {texts.description ?? 'We are not able to activate your device.'}
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

export default DeviceCodeActivationDeniedScreen;
