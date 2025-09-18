import { 
  useScreen,
  useTransaction,
  resendEmail
} from '@auth0/auth0-acul-react/reset-password-email';

export const useResetPasswordRequestManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const handleResendEmail = (): void => {
    resendEmail();
  };

  const getScreenText = () => {
    return {
      title: screen.texts?.title || 'Check Your Email',
      description: screen.texts?.usernameDescription || 'We sent a password reset link to your email'
    }
  };

  return {
    resetPasswordRequestManager: { screen, transaction },
    resendEmail: handleResendEmail,
    getScreenText
  };
};

