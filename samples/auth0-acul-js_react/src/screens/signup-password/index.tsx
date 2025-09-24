import React, { useState } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const SignupPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const signupPasswordManager = new SignupPassword();
  const { isValid, results } = signupPasswordManager.validatePassword(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!isValid) return;

    try {
      await signupPasswordManager.signup({ email, phone, password });
      setSuccess(true);
    } catch {
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="prompt-container">
      <Logo />

      {/* Title Section (inline, not imported) */}
      <div className="title-container">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up with password</h2>
      </div>

      {/* Form */}
      <div className="input-container">
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone (optional)</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={!isValid && password.length > 0 ? 'error' : ''}
          />

          {/* Password Validation Rules */}
          {password.length > 0 && results.length > 0 && (
            <div className="password-rules">
              <p>Your password must contain:</p>
              <ul>
                {results.map((rule) => (
                  <li key={rule.code} className={rule.status === 'valid' ? 'valid' : ''}>
                    {rule.label}
                    {rule.items && rule.items.length > 0 && (
                      <ul>
                        {rule.items.map((sub) => (
                          <li key={sub.code} className={sub.status === 'valid' ? 'valid' : ''}>
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

          {/* Error & Success messages */}
          {error && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="success-message">
              Signup successful! Please check your email to verify your account.
            </div>
          )}

          {/* Submit Button */}
          <div className="button-container">
            <Button onClick={() => handleSignup}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPasswordScreen;
