import React from 'react';
import { useMfaPushList, selectMfaPushDevice, goBack } from '@auth0/auth0-acul-react/mfa-push-list';
import { Logo } from '../../components/Logo';

const MfaPushListScreen: React.FC = () => {
  const mfaPushList = useMfaPushList();
  const { screen, user } = mfaPushList;
  const { enrolledDevices } = user || {};

  const handleSelectDevice = async (deviceIndex: number) => {
    try {
      await selectMfaPushDevice({ deviceIndex });
    } catch (error) {
      console.error('Failed to select device:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center"><div className="w-20 h-20"><Logo /></div></div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">{screen.texts?.title ?? 'Select a Device for MFA Push'}</h2>
        {screen.texts?.description && (
          <p className="mt-2 text-center text-sm text-gray-500">{screen.texts?.description}</p>
        )}
        {/* Device List */}
        <div className="mt-6">
          {enrolledDevices && enrolledDevices.length > 0 ? (
            <ul className="space-y-3">
              {enrolledDevices.map(({ device, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleSelectDevice(id)}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {device}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-gray-500">No enrolled devices found.</p>
          )}
        </div>
        {/* Back Action */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.backButtonText ?? 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaPushListScreen;