import React from 'react';
import { useDeviceCodeConfirmation, useScreen, confirm, cancel } from '@auth0/auth0-acul-react/device-code-confirmation';
import { Logo } from '../../components/Logo';

const DeviceCodeConfirmationScreen: React.FC = () => {
  const deviceCodeConfirmationManager = useDeviceCodeConfirmation();
  const screen = useScreen();
  const { transaction: { errors } } = deviceCodeConfirmationManager;
  const texts = screen?.texts || {};

  const handleConfirm = async () => {
    await confirm();
  };

  const handleCancel = async () => {
    await cancel();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8 space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Device Confirmation'}
        </h1>
        {texts.description && (
          <p className="text-center text-sm text-gray-500">{texts.description}</p>
        )}
        {/* Code Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {texts.inputCodeLabel ?? 'Secure code'}
          </label>
          <input
            type="text"
            disabled
            value={screen?.data?.textCode ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
          />
        </div>
        {texts.confirmationText && (
          <p className="text-center text-[11px] text-gray-500 mt-1">{texts.confirmationText}</p>
        )}
        {errors?.length && (
          <div className="mt-2 space-y-1 text-left" aria-live="polite">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-xs">{error.message}</p>
            ))}
          </div>
        )}
        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleCancel}
          >
            {texts.cancelButtonText ?? 'Cancel'}
          </button>
          <button
            className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleConfirm}
          >
            {texts.confirmButtonText ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCodeConfirmationScreen;
