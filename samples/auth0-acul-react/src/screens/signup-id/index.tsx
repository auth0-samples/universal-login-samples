import React, { useState } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { useEnabledIdentifiers } from '@auth0/auth0-acul-react/signup-id';
import { Logo } from '../../components/Logo'; // Ensure this path is correct
import { useTransaction, useScreen, federatedSignup } from '@auth0/auth0-acul-react/signup-id';

const SignupIdScreen: React.FC = () => {
  const identifiers = useEnabledIdentifiers();
  const transaction = useTransaction();
  const screen = useScreen();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const signupIdManager = new SignupId();

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const isEmailRequired = identifiers?.find(id => id.type === 'email')?.required;
    if (isEmailRequired && !email) {
      setError('Email is required.');
      return;
    }

    try {
      await signupIdManager.signup({
        email,
        phone,
        username,
      });
      setSuccess(true);
    } catch {
      setError('Signup failed. Please try again later.');
    }
  };

  const handleFederatedSignup = (connectionName: string) => {
    federatedSignup({ connection: connectionName });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign up for an account
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create your account
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <form onSubmit={handleSignup}>
            {/* Username */}
            {identifiers?.find(id => id.type === 'username') && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username{' '}
                  {identifiers.find(id => id.type === 'username')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={identifiers.find(id => id.type === 'username')?.required}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {/* Email */}
            {identifiers?.find(id => id.type === 'email') && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email{' '}
                  {identifiers.find(id => id.type === 'email')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={identifiers.find(id => id.type === 'email')?.required}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {/* Phone */}
            {identifiers?.find(id => id.type === 'phone') && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone{' '}
                  {identifiers.find(id => id.type === 'phone')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={identifiers.find(id => id.type === 'phone')?.required}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm mt-2">{error}</div>
            )}

            {/* Success Message */}
            {success && (
              <div className="text-green-600 text-sm mt-2">
                Signup successful! Please check your email to verify your account.
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Federated Signup */}
        {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-2">Or continue with</p>
            {transaction.alternateConnections.map((connection) => (
              <button
                key={connection.name}
                onClick={() => handleFederatedSignup(connection.name)}
                className="w-full bg-blue-500 text-white py-2 rounded-md mb-2"
              >
                Continue with {connection.name}
              </button>
            ))}
          </div>
        )}

        {/* Login Link */}
        {screen.links?.loginLink && (
          <div className="mt-6 text-center text-sm">
            <a
              href={screen.links.loginLink}
              className="text-indigo-600 hover:underline"
            >
              Already have an account? Log in
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupIdScreen;
