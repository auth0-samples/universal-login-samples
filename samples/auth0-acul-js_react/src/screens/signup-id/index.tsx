import React, { useState } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { Logo } from '../../components/Logo';

const SignupIdScreen: React.FC = () => {
  const signupIdManager = new SignupId();
  const { screen, transaction } = signupIdManager;
  const identifiers = signupIdManager.getSignupIdentifiers();
  const federatedConnections = transaction.alternateConnections ?? [];

  // Local form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');

  const { isValid: isUsernameValid, errors: usernameResults } =
    signupIdManager.validateUsername(username);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupIdManager.signup({
      username,
      email,
      phone,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
  };

  const handleFederatedSignup = (connectionName: string) => {
    signupIdManager.federatedSignup({ connection: connectionName });
  };

  // Precompute identifier flags
  const usernameId = identifiers?.find((id) => id.type === 'username');
  const emailId = identifiers?.find((id) => id.type === 'email');
  const phoneId = identifiers?.find((id) => id.type === 'phone');

  return (
    <div className="prompt-container">
      <Logo />

      {/* Title Section */}
      <div className="title-container">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {screen.texts?.title || 'Create Your Account'}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {screen.texts?.description || 'Sign Up to continue'}
        </p>
      </div>

      {/* Form Section */}
      <div className="input-container">
        <form onSubmit={handleSignup}>
          {/* Username */}
          {usernameId && (
            <div>
              <label htmlFor="username">
                Username{' '}
                {usernameId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={usernameId.required}
                placeholder="Enter your username"
                className={`input-field ${username && !isUsernameValid ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {username.length > 0 && usernameResults.length > 0 && (
                <ul className="mt-1 text-sm text-red-500">
                  {usernameResults.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Email */}
          {emailId && (
            <div>
              <label htmlFor="email">
                Email{' '}
                {emailId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={emailId.required}
                placeholder="Enter your email"
                className="input-field"
              />
            </div>
          )}

          {/* Phone */}
          {phoneId && (
            <div>
              <label htmlFor="phone">
                Phone{' '}
                {phoneId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={phoneId.required}
                placeholder="Enter your phone number"
                className="input-field"
              />
            </div>
          )}

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label htmlFor="captcha">Captcha</label>
              {screen.captchaImage && (
                <img
                  src={screen.captchaImage}
                  alt="Captcha"
                  className="mb-2 m-auto w-[200px] rounded"
                />
              )}
              <input
                id="captcha"
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the captcha"
                className="input-field"
              />
            </div>
          )}

          {/* Server-side transaction errors */}
          {transaction.errors && transaction.errors.length > 0 && (
            <div className="error-container">
              {transaction.errors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="button-container">
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        {screen.links?.login && (
          <div className="mt-6 text-center text-sm">
            <a href={screen.links.login} className="text-indigo-600 hover:underline">
              Already have an account? Log in
            </a>
          </div>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Federated login */}
        {federatedConnections.length > 0 &&
          federatedConnections.map((conn: any) => (
            <button
              key={conn.name}
              onClick={() => handleFederatedSignup(conn.name)}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue with {conn.options?.display_name || conn.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SignupIdScreen;