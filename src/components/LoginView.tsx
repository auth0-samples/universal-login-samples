// components/LoginView.tsx
import React from 'react';
import { LoginForm } from './LoginForm';
import { PasskeyButton } from './PasskeyButton';
import { ErrorMessage } from './ErrorMessage';
import { AuthLinks } from './AuthLinks';
import { WelcomeSection } from './WelcomeSection';


type LoginViewProps = {
  loginIdManager: any; // Replace 'any' with proper type from your auth0-acul-js library
  onContinue: (username: string, captcha: string) => void;
  onPasskeyLogin: () => void;
  onSocialLogin: (connectionName: string) => void;
};

export const LoginView: React.FC<LoginViewProps> = ({
  loginIdManager,
  onContinue,
  onPasskeyLogin,
}) => (
  <div className="flex min-h-screen bg-gray-100">
    <WelcomeSection />
    
    <div className="w-full md:w-1/2 flex flex-col p-8">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Log in</h2>

          <LoginForm
            onContinue={onContinue}
            isCaptchaAvailable={loginIdManager.screen.isCaptchaAvailable}
            captchaImage={loginIdManager.screen.captchaImage}
          />

          <div className="border-t border-gray-300 my-4" />

          <PasskeyButton onClick={onPasskeyLogin} />

          <div className="border-t border-gray-300 my-4" />

          <div className="mt-4 space-y-2">
            
          </div>

          {loginIdManager.screen.getScreenLinks() && (
            <AuthLinks
              signupLink={loginIdManager.screen.signupLink}
              resetPasswordLink={loginIdManager.screen.resetPasswordLink}
            />
          )}

          <ErrorMessage errors={loginIdManager.transaction.getErrors()} />
        </div>
      </div>
    </div>
  </div>
);