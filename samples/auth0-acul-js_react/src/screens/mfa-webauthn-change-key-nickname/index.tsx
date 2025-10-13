import React, { useState, useMemo, useCallback, ChangeEvent } from 'react';
import MfaWebAuthnChangeKeyNickname, {
  type ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname'; // Adjust path as necessary

const MfaWebAuthnChangeKeyNicknameComponent: React.FC = () => {
  // Instantiate the SDK class for the screen. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnChangeKeyNickname(), []);

  const { client, screen, transaction } = sdk;

  const currentNickname = screen.data?.nickname ?? 'Unknown Key';
  const texts = screen.texts ?? {};

  const [newNickname, setNewNickname] = useState<string>(screen.data?.nickname ?? '');


  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewNickname(event.target.value);
  };

  const handleSubmit = useCallback(() => {
      const opts: ContinueOptions = { nickname: newNickname };
      sdk.continueWithNewNickname(opts);
  }, [sdk, newNickname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Change Security Key Nickname'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? `Update the nickname for your security key. The current nickname is "${currentNickname}".`}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="current-nickname" className="block text-sm font-medium text-gray-700">
              {texts.currentNicknameLabel ?? 'Current Nickname'}
            </label>
            <input
              id="current-nickname"
              type="text"
              value={currentNickname}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         bg-gray-100 text-gray-500 cursor-not-allowed
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="new-nickname" className="block text-sm font-medium text-gray-700">
              {texts.newNicknameLabel ?? 'New Nickname'}
            </label>
            <input
              id="new-nickname"
              name="nickname" // Important for form submission if not using JS for everything
              type="text"
              value={newNickname}
              onChange={handleNicknameChange}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-indigo-500 
                         focus:border-indigo-500 sm:text-sm 
                         ${(transaction.errors?.some(e => e.field === 'nickname')) ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={texts.newNicknamePlaceholder ?? 'Enter new nickname'}
              aria-describedby="nickname-error"
            />
          </div>

          {/* Display transaction errors (e.g., from server validation) */}
          {transaction.errors && transaction.errors.length > 0 && (
            <div id="nickname-error" className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md text-left" role="alert">
              <p className="font-bold">{texts.alertListTitle ?? 'Please correct the following errors:'}</p>
              <ul className="list-disc list-inside">
                {transaction.errors.map((err, index) => (
                  <li key={`tx-err-${index}`}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                       disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Save Nickname
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnChangeKeyNicknameComponent;