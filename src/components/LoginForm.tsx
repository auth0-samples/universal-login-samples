import React, { useRef } from 'react';

type LoginFormProps = {
  onContinue: (username: string, captcha: string) => void;
  isCaptchaAvailable: boolean;
  captchaImage?: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onContinue,
  isCaptchaAvailable,
  captchaImage
}) => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const username = userNameRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";
    onContinue(username, captcha);
  };

  return (
    <div className="mb-4">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
          ref={userNameRef}
        />
      </div>
      
      {isCaptchaAvailable && (
        <div className="mb-4 p-4 bg-gray-200 rounded-md flex items-center justify-center">
          <img src={captchaImage} alt="Captcha" />
          <input
            type="text"
            id="captcha"
            ref={captchaRef}
            placeholder="Enter the captcha"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-ikeaBlue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};