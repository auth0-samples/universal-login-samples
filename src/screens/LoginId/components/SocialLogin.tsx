import  Button  from '../../../components/Button';
interface Connection {
  name: string;
}

interface SocialLoginProps {
  connections?: Connection[];
  onSocialLogin: (name: string) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ connections, onSocialLogin }) => (
  <div className="federated-login-container">
    {connections?.map((connection) => (
      <Button
        key={connection.name}
        onClick={() => onSocialLogin(connection.name)}
      >
        Continue with {connection.name}
      </Button>
    ))}
  </div>
); 