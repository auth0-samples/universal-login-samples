import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  useScreen,
  useTransaction,
  signup as signupMethod,
  federatedSignup,

  useEnabledIdentifiers,
  useUsernameValidation,
  usePasswordValidation,
  useErrors
} from '@auth0/auth0-acul-react/signup';

import { Logo } from '../../components/Logo';

const SignupScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const identifiers = useEnabledIdentifiers();

  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState<Array<{ code: string; message: string }>>([]);
  const [passwordErrors, setPasswordErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [password, setPassword] = useState('');
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const validationRules = useUsernameValidation(username, { includeInErrors: true });
  const { isValid, results } = usePasswordValidation(password, { includeInErrors: true });
  const { errors, hasError } = useErrors();

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? '',
    phoneNumber: phoneNumberRef.current?.value ?? '',
    email: emailRef.current?.value ?? '',
    password: passwordRef.current?.value ?? '',
    captcha: captchaRef.current?.value ?? ''
  });

  const handlePassword = (pwd: string) => {
    setPassword(pwd);
    if (!hasTypedPassword && pwd.length > 0) {
      setHasTypedPassword(true);
    }
  };


  const handleUsername = (value: string) => {
    setUsername(value);
    setIsValidUsername(validationRules.isValid);
    setUsernameError(validationRules.errors.map((err) => ({
      code: 'username',
      message: err.message,
    })
    ));
  };

  const handleSignup = () => {
    const { username, email, phoneNumber, password, captcha } = getFormValues();

    if (!isValid) {
      setPasswordErrors([{ code: 'password', message: 'Password does not meet the required policy.' }]);
      return;
    }

    signupMethod({
      username,
      email,
      phoneNumber,
      password,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
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
          {screen.texts?.title || 'Sign up'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Create your account'}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Email */}
          {identifiers?.find((id) => id.type === 'email') && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email{' '}
                {identifiers.find((id) => id.type === 'email')?.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="Enter your email"
                required={identifiers.find((id) => id.type === 'email')?.required}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Username */}
          {identifiers?.find((id) => id.type === 'username') && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Enter your username{' '}
                {identifiers.find((id) => id.type === 'username')?.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                placeholder="Enter your username"
                onChange={(e) => handleUsername(e.target.value)}
                aria-invalid={!isValidUsername}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isValidUsername ? 'border-red-500' : 'border-gray-300'
                  }`}
                required={identifiers.find((id) => id.type === 'username')?.required}
              />
            </div>

          )}

          {/* Username Errors - errors coming from the useUsernameValidation hook*/}
          {usernameError
            .filter((err) => err.code === 'username')
            .map((err, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {err.message}
              </p>
            ))}

          {
            // Errors coming from the useErrors hook
            errors.byField('username').map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {error.message}
              </p>
            ))
          }

          {/* Phone */}
          {identifiers?.find((id) => id.type === 'phone') && (
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Enter your phone number{' '}
                {identifiers.find((id) => id.type === 'phone')?.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                type="tel"
                id="phoneNumber"
                ref={phoneNumberRef}
                placeholder="Enter your phone number"
                required={identifiers.find((id) => id.type === 'phone')?.required}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter your password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => handlePassword(e.target.value)}
              aria-invalid={!isValid}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isValid ? 'border-red-500' : 'border-gray-300'
                }`}
            />

            {/* Show checklist only when user types - from usePasswordValidation */}
            {password.length > 0 && results.length > 0 && (
              <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
                <p className="mb-1 text-gray-700">Your password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  {results.map((rule) => (
                    <li
                      key={rule.code}
                      className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                    >
                      {rule.label}
                      {rule.items && rule.items.length > 0 && (
                        <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                          {rule.items.map((subRule) => (
                            <li
                              key={subRule.code}
                              className={subRule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                            >
                              {subRule.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* {isPasswordValid} */}
          </div>
          {hasError && !isValid && (
            <div className="mt-2">
              {errors.byField('password').map((error, index) => (
                <p key={index} className="text-red-600">
                  {error.message}
                  {
                    error.rules && error.rules.length > 0 && (
                      <ul className="list-disc list-inside ml-5 mt-1 space-y-1 ">
                        {error.rules.map((rule, ruleIndex) => (
                          <ul key={ruleIndex} className="text-gray-700">
                            {rule.items ? rule.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item.status !== 'valid' && item.label}</li>
                            )) : rule.label}
                          </ul>
                        ))}
                      </ul>
                    )
                  }
                </p>
              ))}
            </div>
          )}

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Enter the captcha
              </label>
              <img
                src={screen.captchaImage ?? ''}
                alt="Captcha"
                className="mb-2 w-full rounded"
              />
              <input
                type="text"
                id="captcha"
                ref={captchaRef}
                placeholder="Enter the captcha"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Continue Button */}
          <div>
            <button onClick={handleSignup} className="w-full bg-blue-500 text-white py-2 rounded-md">
              Continue
            </button>
          </div>
        </div>

        <div>
          {passwordErrors.map((error, index) => (
            <p key={index} className="text-red-600">
              {error.message}
            </p>
          ))}
        </div>


        {/* Federated Signup */}
        {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-2">Or continue with</p>
            {transaction.alternateConnections.map((connection) => (
              <button
                key={connection.name}
                onClick={() => handleFederatedSignup(connection.name)}
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Continue with {connection.name}
              </button>
            ))}
          </div>
        )}

        {/* Login Link */}
        {screen.links?.loginLink && (
          <div className="mt-6 text-center text-sm">
            <a href={screen.links.loginLink} className="text-indigo-600 hover:underline">
              Already have an account? Log in
            </a>
          </div>
        )}

        {/* Errors from server */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}

            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupScreen;

