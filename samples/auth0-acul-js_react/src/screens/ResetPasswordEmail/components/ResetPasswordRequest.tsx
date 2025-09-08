import  Button  from '../../../components/Button';
interface ResetPasswordRequest {
  onLoginClick: () => void;
}

export const ResetPasswordRequest: React.FC<ResetPasswordRequest> = ({
  onLoginClick,
}) => (
  <div className="input-container">
    <label>Check Your Email</label>
    <div className="button-container">
      <Button onClick={onLoginClick}>Resend Email</Button>
    </div>
  
  </div>
); 