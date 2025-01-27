import { useRef } from 'react';

export const useLoginForm = () => {
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    newPassword: newPasswordRef.current?.value ?? "",
    confirmPassword: confirmPasswordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    newPasswordRef,
    confirmPasswordRef,
    captchaRef,
    getFormValues,
  };
};