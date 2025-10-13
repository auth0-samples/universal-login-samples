import React from 'react';
import { useMfaPushList, selectMfaPushDevice, goBack } from '@auth0/auth0-acul-react/mfa-push-list';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{ screen.texts?.title ?? 'Select a Device for MFA Push' } </h2>
        <p className="mb-4"> { screen.texts?.description } </p>
        {
          enrolledDevices && enrolledDevices.length > 0 ? (
            <ul className="mb-4">
              {enrolledDevices.map(({device, id}) => (
                <li key={id} className="mb-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleSelectDevice(id)}
                  >
                    {device}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled devices found.</p>
          )
        }
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MfaPushListScreen;