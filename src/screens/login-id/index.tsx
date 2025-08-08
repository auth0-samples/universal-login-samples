import React, { useRef, useState } from 'react';
import { useScreen, useTransaction, login, federatedLogin, passkeyLogin } from '@auth0/auth0-acul-react/login-id';
import { Logo } from '../../components/Logo';

// pickCountryCode
const LoginIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleLoginClick = async () => {
    const username = usernameRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    const captcha = captchaRef.current?.value ?? '';

    setIsLoading(true);
    setErrorMessages([]);

    try {
      await login({ username, password, captcha });
    } catch (err: any) {
      const message = err?.message || 'Login failed';
      setErrorMessages([message]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    setErrorMessages([]);
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      setErrorMessages([err.message || 'Federated login failed']);
    }
  };

  const handlePasskeyLogin = async () => {
    setErrorMessages([]);
    try {
      await passkeyLogin({});
    } catch (err: any) {
      setErrorMessages([err.message || 'Passkey login failed']);
    }
  };

  const isCaptchaAvailable = (screen as any).isCaptchaAvailable || false;
  const alternateConnections = transaction.alternateConnections || [];
  const passkeyEnabled = (transaction.currentConnection as any)?.options?.authentication_methods?.passkey?.enabled;
  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Logo className="mx-auto h-12 w-auto" />

          <h2 className="mt-6 text-3xl font-extrabold text-indigo-500">
            {screen.texts?.title || 'Welcome'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {screen.texts?.description}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                {screen.texts?.usernameOrEmailPlaceholder || 'Username or Email'}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder={screen.texts?.usernameOrEmailPlaceholder || 'Username or email address'}
                ref={usernameRef}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>



            {isCaptchaAvailable && (
              <div className="mt-4">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">
                  {screen.texts?.captchaCodePlaceholder || 'Enter the code shown above'}
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder={screen.texts?.captchaCodePlaceholder || 'Enter captcha'}
                  ref={captchaRef}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (screen.texts?.buttonText ? `${screen.texts.buttonText}...` : 'Logging in...') : screen.texts?.buttonText || 'Login'}
            </button>
          </div>
        </form>

        {alternateConnections.length > 0 && (
          <div className="mt-6">
            <h3 className="text-center text-gray-400 mb-4">Login with Social</h3>
            <div className="flex justify-center flex-wrap gap-3">
              {alternateConnections.map((conn: any) => (
                <button
                  key={conn.name}
                  onClick={() => handleFederatedLogin(conn.name)}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue with {conn.options?.display_name || conn.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {passkeyEnabled && (
          <div className="mt-6">
            <button
              onClick={handlePasskeyLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {screen.texts?.passkeyButtonText || 'Continue with a passkey'}
            </button>
          </div>
        )}

        {screen.links?.signup && (
          <p className="mt-6 text-center text-gray-400">
            {screen.texts?.footerText || "Don't have an account?"}{' '}
            <a href={screen.links.signup} className="font-medium text-indigo-600 hover:text-indigo-500">
              {screen.texts?.signupActionLinkText || 'Sign up'}
            </a>
          </p>
        )}

        {screen.links?.reset_password && (
          <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
            <a href={screen.links.reset_password}>{screen.texts?.forgotPasswordText || "Can't log in to your accounthkkhk?"}</a>
          </p>
        )}

        {transaction.hasErrors && errorMessages.length > 0 && (
          <div className="mt-4 text-red-600 text-center">
            {errorMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginIdScreen;
