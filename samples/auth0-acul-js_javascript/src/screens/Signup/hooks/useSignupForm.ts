import { useRef } from 'react';

export const useSignupForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    phoneNumber: phoneNumberRef.current?.value ?? "",
    email: emailRef.current?.value ?? "",
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    usernameRef,
    phoneNumberRef,
    emailRef,
    passwordRef,
    captchaRef,
    getFormValues,
  };
};