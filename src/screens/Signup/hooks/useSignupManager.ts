import { useState, useEffect } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/signup";
import { withWindowDebug } from "../../../utils";

export const useSignupManager = () => {
  const [signupManager] = useState(() => new LoginInstance());
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
    withWindowDebug(signupManager, 'signup')

  // Patch the updateTransactionState method to sync errors to React state
  useEffect(() => {
    const originalUpdateTransactionState = signupManager.updateTransactionState.bind(signupManager);

    signupManager.updateTransactionState = (error) => {
      originalUpdateTransactionState(error);

      // Sync React state with SDK transaction errors
      setErrors([...(signupManager.transaction.errors || [])]); // handle null case by defaulting to an empty array
      setHasErrors(signupManager.transaction.hasErrors);
    };

    // Cleanup on unmount if needed
    return () => {
      signupManager.updateTransactionState = originalUpdateTransactionState;
    };
  }, [signupManager]);

    const handleSignup = (username: string, email: string, phoneNumber: string,  password: string, captcha: string): void => {
    const options = {
      username,
      email,
      phoneNumber,
      password,
      captcha: signupManager.screen.isCaptchaAvailable ? captcha : "",
    };
    signupManager.signup(options);
  };

 
   const handleSocialSignup = (connectionName: string) => {
    signupManager.socialSignup({ connection: connectionName });
  };

  return {
    signupManager,
    handleSignup,
    handleSocialSignup,
    errors,
    hasErrors,
  };
};

