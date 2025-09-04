import React, { useState } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';

const SignupPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [passwordErrors, setPasswordErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [passwordValidation, setPasswordValidation] = useState<Array<{ code: string; policy: string; isValid: boolean }>>([]); // NEW
  const [hasTypedPassword, setHasTypedPassword] = useState(false);

  const signupPasswordManager = new SignupPassword();

  const onPasswordChange = (password: string) => {
    setPassword(password)

    if (!hasTypedPassword && password.length > 0) {
      setHasTypedPassword(true);
    }

    const results = signupPasswordManager.validatePassword(password);
    setPasswordValidation(results);

    const failedRules = results.filter(r => !r.isValid);
    setIsValid(failedRules.length === 0);
    setErrors(failedRules.map(r => ({ code: r.code, message: r.policy })));
  };


  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    const results = signupPasswordManager.validatePassword(password);
    setPasswordValidation(results);

    const failedRules = results.filter(r => !r.isValid);
    setIsValid(failedRules.length === 0);
    setErrors(failedRules.map(r => ({ code: r.code, message: r.policy })));

    if (!isValid) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors([]);

    try {
      await signupPasswordManager.signup({
        email,
        phone,
        password,
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
          Sign up with password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.length ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
              />
              {/* Show validation errors if any */}
              {hasTypedPassword && passwordValidation && passwordValidation.length > 0 && (
                <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
                  <p className="mb-1 text-gray-700">Your password must contain:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {(() => {
                      const subItemCodes = [
                        'password-policy-lower-case',
                        'password-policy-upper-case',
                        'password-policy-numbers',
                        'password-policy-special-characters'
                      ];

                      const containsAtLeastRule = passwordValidation.find(
                        r => r.code === 'password-policy-contains-at-least'
                      );

                      return passwordValidation.map((rule) => {
                        const isSubItem = subItemCodes.includes(rule.code);

                        // If we have a parent rule, subitems will be rendered under it, so skip them here
                        if (containsAtLeastRule && isSubItem) return null;

                        // Render the "contains at least" rule with subitems
                        if (rule.code === 'password-policy-contains-at-least') {
                          const subItems = passwordValidation.filter(r =>
                            subItemCodes.includes(r.code)
                          );

                          return (
                            <li
                              key={rule.code}
                              className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                            >
                              {rule.policy}
                              {subItems.length > 0 && (
                                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                  {subItems.map((subItem) => (
                                    <li
                                      key={subItem.code}
                                      className={subItem.isValid ? 'text-green-600' : 'text-gray-700'}
                                    >
                                      {subItem.policy}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        }

                        // Render all others normally
                        return (
                          <li
                            key={rule.code}
                            className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                          >
                            {rule.policy}
                          </li>
                        );
                      });
                    })()}
                  </ul>
                </div>
              )}
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && (
              <div className="text-green-600 text-sm">
                Signup successful! Please check your email to verify your account.
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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

export default SignupPasswordScreen;
