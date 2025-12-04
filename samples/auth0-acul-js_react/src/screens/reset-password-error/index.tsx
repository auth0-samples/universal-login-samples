import React from "react";
import { useResetPasswordErrorManager } from './hooks/useResetPasswordErrorManager';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { ErrorMessages } from './components/ErrorMessages';

const ResetPasswordScreen: React.FC = () => {
  const { resetPasswordErrorManager } = useResetPasswordErrorManager();

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordErrorManager.screen.texts!} />

      <p>{resetPasswordErrorManager.screen.texts?.description}</p>

      {resetPasswordErrorManager.transaction.hasErrors && resetPasswordErrorManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordErrorManager.transaction.errors!} />
      )}

      {/* Back to Login Button */}
      {resetPasswordErrorManager.screen.links?.back_to_app && (
        <div className="button-container">
          <a
            href={resetPasswordErrorManager.screen.links.back_to_app}
            className="inline-block w-full px-4 py-2 text-center text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {resetPasswordErrorManager.screen.texts?.backToLoginLinkText || "Back to Login"}
          </a>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordScreen;
