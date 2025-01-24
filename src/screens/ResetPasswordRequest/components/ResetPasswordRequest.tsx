import  Button  from '../../../components/Button';
interface ResetPasswordRequest {
  usernameRef: React.RefObject<HTMLInputElement>;
  onBackClick: () => void;
  onLoginClick: () => void;
}

export const ResetPasswordRequest: React.FC<ResetPasswordRequest> = ({
  usernameRef,
  onBackClick,
  onLoginClick,
}) => (
  <div className="input-container">
    <label>Enter your username</label>
    <input
      type="text"
      id="username"
      ref={usernameRef}
      placeholder="Enter your username"
    />
    <div className="button-container">
      <Button onClick={onLoginClick}>Continue</Button>
    </div>
    <div className="button-container">
      <Button onClick={onBackClick}>Back To My App</Button>
    </div>
  </div>
); 