import React, { useState } from 'react';
import { useScreen, useTransaction, login } from '@auth0/auth0-acul-react/login-password';
import { Logo } from '../../components/Logo';

const LoginPasswordScreen: React.FC = () => {
  const screen = useScreen();
  
  const transaction = useTransaction();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const username = screen.data?.username || '';

  const handleLoginClick = async () => {
    setIsLoading(true);
    setErrorMessages([]);

    try {
      await login({ username, password });
    } catch (err: any) {
      setErrorMessages([err?.message || 'Login failed']);
    } finally {
      setIsLoading(false);
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
          {screen.texts?.title || 'Enter Your Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || `Enter your password for ${username}`}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          {/* Username (prefilled, read-only) */}
          <div>
            <input
              type="text"
              value={username}
              readOnly
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              {screen.texts?.passwordPlaceholder || 'Password'}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={screen.texts?.passwordPlaceholder || 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Continue Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading
                ? (screen.texts?.buttonText ? `${screen.texts.buttonText}...` : 'Continuing...')
                : screen.texts?.buttonText || 'Continue'}
            </button>
          </div>
        </form>

        {/* Links */}
        {screen.links && (
          <>
            {/* Signup */}
            {screen.links.signup && (
              <p className="mt-4 text-center text-sm text-gray-500">
                {screen.texts?.footerText || "Don't have an account?"}{' '}
                <a href={screen.links.signup} className="text-indigo-500 hover:underline">
                  {screen.texts?.signupActionLinkText || 'Sign up'}
                </a>
              </p>
            )}

            {/* Reset Password */}
            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || 'Forgot password?'}
                </a>
              </p>
            )}
          </>
        )}

        {/* Errors */}
        {transaction.hasErrors && errorMessages.length > 0 && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errorMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPasswordScreen;