import React, { useMemo } from 'react';
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import type { Scope, AuthorizationDetail } from '@auth0/auth0-acul-js/customized-consent';

const CustomizedConsentScreen: React.FC = () => {
  // Instantiate the SDK class for the Customized Consent screen.
  // useMemo ensures it's only created once per component instance.
  const consentManager = useMemo(() => new CustomizedConsent(), []);

  const { client, organization, screen, transaction, user } = consentManager;
  const texts = screen.texts ?? {}; // UI texts from Auth0 dashboard
  const screenData = screen; // Access parsed scopes and authorizationDetails
  const handleAccept = () => {
    consentManager.accept();
  };

  const handleDecline = () => {
    consentManager.deny();
  };

  const pageTitle = texts.title ?? 'Authorize Application';
  const description = texts.description ?? `${client.name || 'The application'} is requesting access to your account and specific resources.`;
  const acceptButtonText = texts.acceptButtonText ?? 'Allow Access';
  const declineButtonText = texts.declineButtonText ?? 'Deny Access';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6">
        {/* Client Logo and Name */}
        <div className="flex flex-col items-center space-y-3">
          {client.logoUrl && (
            <img src={client.logoUrl} alt={`${client.name || 'Application'} logo`} className="h-16 w-16 rounded-full object-contain" />
          )}
          <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        </div>

        {/* User and Organization Info */}
        <div className="text-center text-gray-600">
          <p>{description}</p>
          {user.email && <p className="mt-1 text-sm">You are logged in as <span className="font-semibold">{user.email}</span>.</p>}
          {organization?.name && (
            <p className="mt-1 text-sm">
              This access is being requested on behalf of the organization: <span className="font-semibold">{organization.displayName || organization.name}</span>.
            </p>
          )}
        </div>

        {/* Scopes (Permissions) Section */}
        {screenData.scopes.length > 0 && (
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {texts.scopesTitle ?? 'This application will be able to:'}
            </h2>
            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {screenData.scopes.map((scope: Scope) => (
                <li key={scope.name} className="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm">
                  <svg className="flex-shrink-0 h-6 w-6 text-blue-500 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-md font-medium text-gray-800">{scope.description || scope.name}</p>
                    {scope.values && scope.values.length > 0 && (
                      <p className="text-xs text-gray-500 pl-1">Details: {scope.values.join(', ')}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Authorization Details Section */}
        {screenData.authorizationDetails.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {texts.authorizationDetailsTitle ?? 'Specific Authorization Details:'}
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {screenData.authorizationDetails.map((detail: AuthorizationDetail, index: number) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-blue-700 capitalize mb-2">
                    {detail.type.replace(/_/g, ' ')}
                  </h3>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {Object.entries(detail).map(([key, value]) => {
                      if (key === 'type') return null; // Skip the type, already displayed
                      return (
                        <li key={key} className="text-sm text-gray-600">
                          <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display transaction errors */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md mt-6" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            <ul className="list-disc list-inside ml-4">
              {transaction.errors.map((err, index) => (
                <li key={`tx-err-${index}`}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleDecline}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {declineButtonText}
          </button>
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizedConsentScreen;