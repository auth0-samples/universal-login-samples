import React, { useEffect } from 'react';
import { useMfaPushEnrollmentQr, pickAuthenticator, useMfaPolling } from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';
import { Logo } from '../../components/Logo';

const MfaPushEnrollmentQrScreen: React.FC = () => {
  const mfaPushEnrollmentQr = useMfaPushEnrollmentQr();
  const { screen } = mfaPushEnrollmentQr;
  const { qrCode, qrUri, showCodeCopy } = screen.data || {};

  const { isRunning, startPolling, stopPolling } = useMfaPolling({
      intervalMs: 3000,
      onCompleted: () => {
        console.log('Push approved | declined');
      },
      onError: (error) => {
        console.error('Polling error:', error);
      }
    });
  
    useEffect(() => {
      startPolling();
      return () => stopPolling();
    }, [startPolling, stopPolling]);
  

  const handlePickAuthenticator = async () => {
    try {
      await pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  const handleCopyCode = () => {
    if (qrUri) {
      navigator.clipboard.writeText(qrUri)
        .then(() => {
          alert('Code copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy code:', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen.texts?.title ?? 'Enroll with Push Notification'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 mb-6">
          {screen.texts?.description ?? ''}
        </p>
        {/* QR Code Section */}
        {qrCode ? (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            </div>

            {showCodeCopy && qrUri && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Or copy this code to your authenticator app:</p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Copy code"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-6">
            <p>Loading QR Code...</p>
          </div>
        )}

        {/* Button */}
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={handlePickAuthenticator}
        >
          Try Another Method
        </button>
      </div>
    </div>
  );
};

export default MfaPushEnrollmentQrScreen;