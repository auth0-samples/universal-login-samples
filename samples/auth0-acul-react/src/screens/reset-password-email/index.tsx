import React, { useState } from "react";
import { Logo } from '../../components/Logo';
import { useScreen, useTransaction, resendEmail } from '@auth0/auth0-acul-react/reset-password-email';

const ResetPasswordEmailScreen: React.FC = () => {
  const screenTexts = useScreen();
  const transaction = useTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resendEmail();
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
          {screenTexts.texts?.title || "Reset your password"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screenTexts.texts?.emailDescription || ""}
        </p>

        {/* Form */} 
        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screenTexts.texts?.resendLinkText || "Send reset link"}
          </button>
        </form>

        {/* Error Messages */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.join(", ")}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ResetPasswordEmailScreen;