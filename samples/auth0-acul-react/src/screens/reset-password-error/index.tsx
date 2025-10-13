import React from "react";
import { Logo } from "../../components/Logo";
import { useScreen } from "@auth0/auth0-acul-react/reset-password-error";

const ResetPasswordErrorScreen: React.FC = () => {
  const screenTexts = useScreen();

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
        <h1 className="text-2xl font-bold text-center text-red-700">
          {screenTexts.texts?.title || "Password Reset Error"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screenTexts.texts?.description || "There was an error resetting your password. Please try again or contact support."}
        </p>

      </div>
    </div>
  );
};

export default ResetPasswordErrorScreen;