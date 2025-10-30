import React, { useState } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { Logo } from '../../components/Logo';

const SignupPasswordScreen: React.FC = () => {
  const signupPasswordManager = new SignupPassword();
  const { screen, transaction } = signupPasswordManager;

  // Local state
  const [email] = useState(screen.data?.email || '');
  const [username] = useState(screen.data?.username || '');
  const [phone] = useState(screen.data?.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  // Validation
  const { isValid: isPasswordValid, results: passwordResults } =
    signupPasswordManager.validatePassword(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupPasswordManager.signup({
      email,
      username,
      phone,
      password,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
  };

  return (
    <div className="prompt-container">
      <Logo />

      {/* Title Section */}
      <div className="title-container">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {screen.texts?.title || 'Sign up with password'}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {screen.texts?.description || 'Create your account'}
        </p>
      </div>

      {/* Form */}
      <div className="input-container">
        <form onSubmit={handleSignup}>
          {/* Email */}
          {email && (
            <div>
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                placeholder="Enter your email"
                className="input-field"
              />
            </div>
          )}

          {/* Username */}
          {username && (
            <div>
              <label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                disabled
                placeholder="Enter your username"
                className="input-field"
              />
            </div>
          )}

          {/* Phone */}
          {phone && (
            <div>
              <label htmlFor="phone">
                Phone <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                disabled
                placeholder="Enter your phone number"
                className="input-field"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className={`input-field ${password && !isPasswordValid ? 'border-red-500' : 'border-gray-300'
                }`}
            />

            {/* Password Validation Rules */}
            {password.length > 0 && passwordResults.length > 0 && (
              <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
                <p className="text-gray-700 mb-1">Your password must contain:</p>
                <ul className="list-disc ml-4">
                  {passwordResults.map((rule) => (
                    <li
                      key={rule.code}
                      className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                    >
                      {rule.label}
                      {rule.items && rule.items.length > 0 && (
                        <ul className="ml-5 list-disc">
                          {rule.items.map((sub) => (
                            <li
                              key={sub.code}
                              className={sub.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                            >
                              {sub.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

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
      </div>
    </div>
  );
};

export default SignupPasswordScreen;
