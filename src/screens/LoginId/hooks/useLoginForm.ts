import { useRef } from 'react';

export const useLoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    usernameRef,
    captchaRef,
    getFormValues,
  };
};