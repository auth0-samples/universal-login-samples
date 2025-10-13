import React, { useState } from 'react';
import { useLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

const LoginPasswordlessSmsOtpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);

  const loginPasswordlessSmsOtp = useLoginPasswordlessSmsOtp();

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    setResent(false);

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      if (username) {
        await loginPasswordlessSmsOtp.submitOTP({ code: otp, username });
      } else {
        await loginPasswordlessSmsOtp.submitOTP({ code: otp });
      }
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
      setError(errorMessage);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess(false);
    setResent(false);
    try {
      if (username) {
        await loginPasswordlessSmsOtp.resendOTP({ username });
      } else {
        await loginPasswordlessSmsOtp.resendOTP();
      }
      setResent(true);
    } catch {
      setError('Failed to resend OTP. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Continue with SMS OTP
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username (optional)
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username (optional)"
                />
              </div>
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the OTP"
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">Login successful!</div>}
            {resent && <div className="text-blue-600 text-sm">OTP resent to your phone.</div>}

            <div className="flex items-center justify-between">
              <button
                onClick={handleSubmit}
                className="flex-1 mr-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleResend}
                className="flex-1 ml-2 py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPasswordlessSmsOtpScreen;
