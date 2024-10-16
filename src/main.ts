import './style.scss';
import { LoginId } from 'ul-javascript/login-id';
import { loginId, loginPassword } from './screens';

let loginManager = new LoginId();
const { screen } = loginManager;

const currentScreen = screen.name;

if (import.meta.env.MODE === 'development') {
  loginId(); // Load whatever component you want to work on.
} else {
  switch(currentScreen) {
    case 'login-id':
      loginId();
      break;
    case 'login':
      // login();
      break;
    case 'login-password':
      loginPassword();
      break;
    case 'signup-id':
      // signUpId();
      break;
    case 'signup-password':
      // signUpPassword();
      break;
    case 'login-passwordless-email-code':
      // loginPasswordlessEmailCode();
      break;
    case 'consent':
      // consent();
      break;
    default:
      console.error('Screen not found', currentScreen);
  }
}
