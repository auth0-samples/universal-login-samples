import React, { useMemo } from 'react';
import { useCustomizedConsent, accept, deny } from '@auth0/auth0-acul-react/customized-consent';
import type { Scope, AuthorizationDetail } from '@auth0/auth0-acul-react/types';
import { Logo } from '../../components/Logo';

const CustomizedConsentScreen: React.FC = () => {
  // Instantiate the SDK class for the Customized Consent screen.
  // useMemo ensures it's only created once per component instance.
  const consentManager = useMemo(() => useCustomizedConsent(), []);

  const { client, organization, screen, transaction, user } = consentManager;
  const texts = screen.texts ?? {}; // UI texts from Auth0 dashboard
  const screenData = screen; // Access parsed scopes and authorizationDetails

  const handleAccept = () => {
    accept();
  };

  const handleDecline = () => {
    deny();
  };

  const pageTitle = texts.title ?? 'Authorize Application';
  const description = texts.description ?? `${client.name || 'The application'} is requesting access to your account and specific resources.`;
  const acceptButtonText = texts.acceptButtonText ?? 'Allow Access';
  const declineButtonText = texts.declineButtonText ?? 'Deny Access';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            {client.logoUrl ? (
              <img src={client.logoUrl} alt={`${client.name || 'Application'} logo`} className="h-20 w-20 object-contain" />
            ) : (
              <Logo />
            )}
          </div>
        </div>
        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-gray-900">{pageTitle}</h1>
        {/* User / Org Info */}
        <div className="text-center text-sm text-gray-600 space-y-1">
          <p>{description}</p>
          {user.email && <p>You are logged in as <span className="font-medium">{user.email}</span>.</p>}
          {organization?.name && (
            <p>Organization: <span className="font-medium">{organization.displayName || organization.name}</span></p>
          )}
        </div>
        {/* Scopes */}
        {screenData.scopes.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3">{texts.scopesTitle ?? 'This application will be able to:'}</h2>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {screenData.scopes.map((scope: Scope) => (
                <li key={scope.value} className="flex items-start p-2 bg-gray-50 rounded border border-gray-200">
                  <svg className="flex-shrink-0 h-5 w-5 text-indigo-600 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <div className="text-xs text-gray-700">
                    <p className="font-medium">{scope.value}</p>
                    <p>{scope.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Authorization Details */}
        {screenData.authorizationDetails.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3">{texts.authorizationDetailsTitle ?? 'Specific Authorization Details:'}</h2>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
              {screenData.authorizationDetails.map((detail: AuthorizationDetail, index: number) => (
                <div key={index} className="p-3 bg-indigo-50 border border-indigo-200 rounded">
                  <h3 className="text-xs font-semibold text-indigo-700 mb-1 uppercase tracking-wide">{detail.type.replace(/_/g, ' ')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(detail).map(([key, value]) => {
                      if (key === 'type') return null;
                      return (
                        <li key={key} className="text-[11px] text-gray-700"><span className="font-medium">{key.replace(/_/g, ' ')}:</span> {String(value)}</li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Errors */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="rounded-md bg-red-50 p-3 border border-red-200" role="alert">
            <p className="text-xs font-semibold text-red-700 mb-1">{texts.alertListTitle ?? 'Errors:'}</p>
            <ul className="text-[11px] list-disc list-inside space-y-1">
              {transaction.errors.map((err, index) => (
                <li key={`tx-err-${index}`}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleDecline}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {declineButtonText}
          </button>
          <button
            onClick={handleAccept}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizedConsentScreen;