import React, { useState, useEffect } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';

const SignupIdScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [identifiers, setIdentifiers] = useState<Array<{ type: string; required: boolean }>>([]);

  const signupIdManager = new SignupId();

  useEffect(() => {
    const enabledIds = signupIdManager.getSignupIdentifiers();
    setIdentifiers(enabledIds ?? []);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation based on required identifiers
    const emailRequired = identifiers.find((id) => id.type === 'email')?.required;
    const phoneRequired = identifiers.find((id) => id.type === 'phone')?.required;
    const usernameRequired = identifiers.find((id) => id.type === 'username')?.required;

    if (emailRequired && !email) {
      setError('Email is required.');
      return;
    }
    if (phoneRequired && !phone) {
      setError('Phone number is required.');
      return;
    }
    if (usernameRequired && !username) {
      setError('Username is required.');
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an accounttttt
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Email field */}
            {identifiers.find((id) => id.type === 'email') && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email{' '}
                  {identifiers.find((id) => id.type === 'email')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={identifiers.find((id) => id.type === 'email')?.required}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Phone field */}
            {identifiers.find((id) => id.type === 'phone') && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone{' '}
                  {identifiers.find((id) => id.type === 'phone')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required={identifiers.find((id) => id.type === 'phone')?.required}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Username field */}
            {identifiers.find((id) => id.type === 'username') && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username{' '}
                  {identifiers.find((id) => id.type === 'username')?.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-gray-500 text-sm">(optional)</span>
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required={identifiers.find((id) => id.type === 'username')?.required}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm">
                Signup successful! Please check your email to verify your account.
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupIdScreen;
