import React, { useRef, useState } from 'react';
import { 
  useScreen, 
  useTransaction, 
  signup as signupMethod, 
  federatedSignup, 
  usePasswordValidation,
  useIdentifiers
} from '@auth0/auth0-acul-react/signup';

import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const SignupScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const identifiers = useIdentifiers();

  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? '',
    phoneNumber: phoneNumberRef.current?.value ?? '',
    email: emailRef.current?.value ?? '',
    password: passwordRef.current?.value ?? '',
    captcha: captchaRef.current?.value ?? ''
  });

  const handleSignup = () => {
    const { username, email, phoneNumber, password, captcha } = getFormValues();
    const passwordValidation = usePasswordValidation(password);

    if (!passwordValidation) {
      return;
    }

    const { isValid, errors } = passwordValidation;
    setIsValid(isValid);
    setErrors(errors);

    if (!isValid) {
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
    <div className="prompt-container">
      <Logo />
      <div className="title-container">
        <h1>{screen.texts?.title}</h1>
        <p>{screen.texts?.description}</p>
      </div>

      <div className="input-container">
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {transaction.countryCode}: +{transaction.countryPrefix}
        </button>

        {identifiers.find((id) => id.type === 'email') && (
          <>
            <label htmlFor="email">
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
            />
          </>
        )}

        {identifiers.find((id) => id.type === 'username') && (
          <>
            <label htmlFor="username">
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
              required={identifiers.find((id) => id.type === 'username')?.required}
            />
          </>
        )}

        {identifiers.find((id) => id.type === 'phone') && (
          <>
            <label htmlFor="phoneNumber">
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
            />
          </>
        )}

        <label htmlFor="password">
          Enter your password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!isValid}
          required
          className={`input w-full border px-4 py-2 rounded ${
            !isValid ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        {!isValid && (
          <ul className="text-red-500 text-sm list-disc list-inside">
            {errors.map((err) => (
              <li key={err.code}>{err.message}</li>
            ))}
          </ul>
        )}

        {screen.isCaptchaAvailable && (
          <div className="captcha-container">
            <img src={screen.captchaImage ?? ''} alt="Captcha" />
            <label htmlFor="captcha">Enter the captcha</label>
            <input
              type="text"
              id="captcha"
              ref={captchaRef}
              placeholder="Enter the captcha"
            />
          </div>
        )}

        <div className="button-container">
          <Button onClick={handleSignup}>Continue</Button>
        </div>
      </div>

      {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
        <div className="federated-login-container">
          {transaction.alternateConnections.map((connection) => (
            <Button key={connection.name} onClick={() => handleFederatedSignup(connection.name)}>
              Continue with {connection.name}
            </Button>
          ))}
        </div>
      )}

      {screen.links?.loginLink && (
        <div className="links">
          <a href={screen.links.loginLink}>Sign Up</a>
        </div>
      )}

      {/* Password validation errors from usePasswordValidation */}
      {!isValid && (
        <div className="error-container client-errors">
          {errors.map((error, index) => (
            <p key={`client-error-${index}`}>{error.message}</p>
          ))}
        </div>
      )}

      {transaction.hasErrors && transaction.errors && (
        <div className="error-container">
          {transaction.errors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignupScreen;
