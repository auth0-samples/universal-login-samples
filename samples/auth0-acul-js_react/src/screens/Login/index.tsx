import React, { useRef, useState, useMemo } from "react";
import { Logo } from "../../components/Logo";
import {
  useScreen,
  useTransaction,
  login,
  federatedLogin,
  useActiveIdentifiers,
} from "@auth0/auth0-acul-react/login";

const LoginScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const activeIdentifiers = useActiveIdentifiers();
  const federatedConnections = transaction.alternateConnections ?? [];

  const identifierLabel = useMemo(() => {
    if (activeIdentifiers.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers.join(" or ")}`;
  }, [activeIdentifiers]);

  const handleLogin = async () => {
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";
    setErrorMessages([]);
    setLoading(true);

    try {
      await login({
        username,
        password,
        captcha: screen.isCaptchaAvailable ? captcha : "",
      });
    } catch (err: any) {
      setErrorMessages([err?.message || "Login failed"]);
    } finally {
      setLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    setErrorMessages([]);
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      setErrorMessages([err?.message || "Federated login failed"]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Logo (optional) */}
        <div className="flex justify-center mb-6">
          <Logo/>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || "Welcome"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || "Log in to continue"}
        </p>

        {/* Form */}
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Username / Email / Phone */}
          <div>
            <label htmlFor="username">
              {identifierLabel}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder={identifierLabel}
              ref={usernameRef}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              ref={passwordRef}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Captcha (optional) */}
          {screen.isCaptchaAvailable && (
            <div>
              <img
                src={screen.captchaImage ?? ""}
                alt="Captcha"
                className="mb-2 w-full rounded"
              />
              <input
                id="captcha"
                name="captcha"
                type="text"
                placeholder="Enter captcha"
                ref={captchaRef}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading
              ? screen.texts?.buttonText
                ? `${screen.texts.buttonText}...`
                : "Logging in..."
              : screen.texts?.buttonText || "Login"}
          </button>
        </form>

        {/* Federated Logins */}
        {federatedConnections.length > 0 && (
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-2">Or continue with</p>
            {federatedConnections.map((connection) => (
              <button
                key={connection.name}
                onClick={() => handleFederatedLogin(connection.name)}
                className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Continue with {connection.name}
              </button>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex justify-between mt-6 text-sm">
          {screen.signupLink && (
            <a
              href={screen.signupLink}
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </a>
          )}
          {screen.resetPasswordLink && (
            <a
              href={screen.resetPasswordLink}
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
          )}
        </div>

        {/* Errors */}
        {transaction.hasErrors && errorMessages.length > 0 && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {errorMessages.map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
