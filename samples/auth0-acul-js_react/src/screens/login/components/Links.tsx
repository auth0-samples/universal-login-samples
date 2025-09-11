interface LinksProps {
  signupLink?: string;
  resetPasswordLink?: string;
}

export const Links: React.FC<LinksProps> = ({ signupLink, resetPasswordLink }) => (
  <div className="links">
    {signupLink && <a href={signupLink}>Sign Up</a>}
    {resetPasswordLink && <a href={resetPasswordLink}>Forgot Password?</a>}
  </div>
); 