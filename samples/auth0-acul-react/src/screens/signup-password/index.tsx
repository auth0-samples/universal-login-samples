import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import {
    // Context hooks
    useScreen,
    useTransaction,
    // Submit functions
    signup as signupMethod,
    usePasswordValidation,
    // Common hooks
    useErrors
} from '@auth0/auth0-acul-react/signup-password';

const SignupPasswordScreen: React.FC = () => {
    const screen = useScreen();
    const transaction = useTransaction();
    const { hasError, errors, dismiss } = useErrors();

    // Local state
    const [email] = useState(screen.data?.email || '');
    const [username] = useState(screen.data?.username || '');
    const [phone] = useState(screen.data?.phone || '');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha]     = useState('');

    // Validation hook – same style as signup.tsx
    const { isValid: isPasswordValid, results: passwordResults } =
        usePasswordValidation(password);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        await signupMethod({
            email,
            username,
            phone,
            password,
            captcha: screen.isCaptchaAvailable ? captcha : ''
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20">
                        <Logo />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    {screen.texts?.title || 'Sign up with password'}
                </h1>
                <p className="mt-2 text-sm text-center text-gray-600">
                    {screen.texts?.description || 'Create your account'}
                </p>

                {/* Form */}
                <form onSubmit={handleSignup} className="mt-6 space-y-6">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            placeholder="Enter your email"
                            className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            disabled
                            placeholder="Enter your email"
                            className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone <span className="text-gray-500 text-sm">(optional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            disabled
                            placeholder="Enter your phone number"
                            className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${password && !isPasswordValid ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />

                        {/* Inline password policy results (identical structure to signup.tsx) */}
                        {password.length > 0 && passwordResults.length > 0 && (
                            <ul className="mt-1 text-sm text-red-500 space-y-1">
                                {passwordResults.map((rule, i) => (
                                    <li key={i} className={rule.isValid ? 'text-green-600' : 'text-red-600'}>
                                        {rule.label}
                                        {rule.items && (
                                            <ul className="ml-4 list-disc space-y-1">
                                                {rule.items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className={item.isValid ? 'text-green-600' : 'text-red-600'}
                                                    >
                                                        {item.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Captcha */}
                    {screen.isCaptchaAvailable && (
                        <div>
                            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                                Captcha
                            </label>
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
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Server-side / global errors */}
                {(transaction.hasErrors || hasError) && (
                    <div className="mt-4 text-sm text-white-900 text-left">
                        {errors.map((err, index) => (
                            <p
                                key={`client-${index}`}
                                className="bg-red-500 text-white flex p-2 mt-1 rounded flex-row items-center"
                            >
                                <span>{err.message}</span>
                                <span
                                    className="ml-auto cursor-pointer"
                                    onClick={() => dismiss(err.id)}
                                >
                                    &#x2715;
                                </span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupPasswordScreen;
