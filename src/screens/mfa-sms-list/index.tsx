import React from 'react';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';

const MFASmsListScreen: React.FC = () => {
  const mfaSmsList = new MfaSmsList();
  (window as any)["mfaSmsList"] = mfaSmsList;
  const { user } = mfaSmsList;

  const handleSelectPhoneNumber = async (index: number) => {
    try {
      await mfaSmsList.selectPhoneNumber({index});
    } catch (error) {
      console.error('Failed to select phone number:', error);
    }
  };

  const handleBackAction = async () => {
    try {
      await mfaSmsList.backAction();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Select a Phone Number</h2>
        {
          user.enrolledPhoneNumbers ? (
            <ul className="mb-4">
              {user.enrolledPhoneNumbers?.map(({phoneNumber, id}) => (
                <li key={id} className="py-2">
                  <button
                    onClick={() => handleSelectPhoneNumber(id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {phoneNumber}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No phone numbers enrolled.</p>
          )
        }
        <button
          onClick={handleBackAction}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MFASmsListScreen;