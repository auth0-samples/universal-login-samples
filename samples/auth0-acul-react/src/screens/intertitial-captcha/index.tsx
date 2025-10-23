import React, { useState } from 'react';
import { useInterstitialCaptcha } from '@auth0/auth0-acul-react/interstitial-captcha';
import { Logo } from '../../components/Logo';

const InterstitialCaptchaScreen: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const interstitialCaptcha = useInterstitialCaptcha();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!captcha) {
      setError('Captcha is required.');
      return;
    }
    try {
      await interstitialCaptcha.submitCaptcha({ captcha });
      setSuccess(true);
    } catch {
      setError('Invalid captcha. Please try again.');
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
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Interstitial Captcha</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Complete the captcha challenge to continue.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">Captcha</label>
            <input
              id="captcha"
              name="captcha"
              type="text"
              required
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Captcha
          </button>
        </form>

        <div className="mt-4 min-h-[20px]" aria-live="polite">
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          {success && !error && <p className="text-xs text-green-600 text-center">Captcha submitted successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default InterstitialCaptchaScreen;