type AuthLinksProps = {
    signupLink?: string;
    resetPasswordLink?: string;
  };
  
  export const AuthLinks: React.FC<AuthLinksProps> = ({ signupLink, resetPasswordLink }) => (
    <div className="mt-6 flex justify-between">
      <a className="text-ikeaBlue hover:underline" href={signupLink}>
        Sign up
      </a>
      <a className="text-ikeaBlue hover:underline" href={resetPasswordLink}>
        Forgot password?
      </a>
    </div>
  );