import React from 'react';
import { useMfaSmsList, selectPhoneNumber, backAction } from '@auth0/auth0-acul-react/mfa-sms-list';
import { Logo } from '../../components/Logo';

const MFASmsListScreen: React.FC = () => {
  const mfaSmsList = useMfaSmsList();
  const { user, screen } = mfaSmsList;
  const enrolled = user.enrolledPhoneNumbers;

  const handleSelectPhoneNumber = async (index: number) => {
    try {
      await selectPhoneNumber({ index });
    } catch (error) {
      console.error('Failed to select phone number:', error);
    }
  };

  const handleBackAction = async () => {
    try {
      await backAction();
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
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen.texts?.title ?? 'Select a Phone Number'}
        </h2>
        {screen.texts?.description && (
          <p className="mt-2 text-center text-sm text-gray-500">{screen.texts?.description}</p>
        )}
        {/* Phone Numbers */}
        <div className="mt-6">
          {enrolled && enrolled.length > 0 ? (
            <ul className="space-y-3">
              {enrolled.map(({ phoneNumber, id }) => (
                <li key={id}>
                  <button
                    onClick={() => handleSelectPhoneNumber(id)}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="button"
                  >
                    {phoneNumber}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-gray-500">No phone numbers enrolled.</p>
          )}
        </div>
        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={handleBackAction}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFASmsListScreen;