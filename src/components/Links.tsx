interface LinksProps {
  loginLink?: string;
}

export const Links: React.FC<LinksProps> = ({ loginLink }) => (
  <div className="links">
    {loginLink && <a href={loginLink}>Sign Up</a>}
  </div>
); 