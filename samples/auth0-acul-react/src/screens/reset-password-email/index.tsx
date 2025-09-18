import React from "react";
import { useResetPasswordRequestManager } from './hooks/useResetPasswordEmailManager';
import { Logo } from "../../components/Logo";
import { Title } from '../../components/Title';
import { ResetPasswordRequest } from './components/ResetPasswordRequest';
import { Links } from '../../components/Links';
import { ErrorMessages } from '../../components/ErrorMessages';

const SignupScreen: React.FC = () => {
  const { resetPasswordRequestManager, resendEmail, getScreenText } = useResetPasswordRequestManager();

  const onUserLoginClick = () => {
    resendEmail();
  };

  const screenTexts = getScreenText();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <div className="mt-6">
          <Title screenTexts={screenTexts} />
        </div>

        {/* Content */}
        <div className="mt-6">
          <ResetPasswordRequest onLoginClick={onUserLoginClick} />
        </div>

        {/* Links */}
        {resetPasswordRequestManager.screen.links && (
          <div className="mt-4">
            <Links loginLink={resetPasswordRequestManager.screen.links.loginLink!} />
          </div>
        )}

        {/* Error Messages */}
        {resetPasswordRequestManager.transaction.hasErrors && resetPasswordRequestManager.transaction.errors && (
          <div className="mt-4">
            <ErrorMessages errors={resetPasswordRequestManager.transaction.errors!} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupScreen;
