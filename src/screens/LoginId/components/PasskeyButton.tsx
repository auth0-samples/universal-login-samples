import  Button  from '../../../components/Button';

interface PasskeyButtonProps {
  onPasskeyLogin: () => void;
}

export const PasskeyButton: React.FC<PasskeyButtonProps> = ({ onPasskeyLogin }) => (
  <div className="passkey-container">
    <Button onClick={onPasskeyLogin}>Continue with Passkey</Button>
  </div>
); 