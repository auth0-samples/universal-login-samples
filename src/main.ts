import './style.scss';
// import { screen } from 'ul-javascript/login-id';

import { currentScreen, currentPrompt } from 'ul-javascript';

// import { login, loginId, loginPassword, signUpId, signUpPassword, loginPasswordlessEmailCode, consent } from './screens';
import { loginId } from './screens';


if (import.meta.env.MODE === 'development') {
  loginId(); // Load whatever component you want to work on.
} else {
  // switch(currentScreen) {
  //   case 'login-id':
  //     loginId();
  //     break;
  //   case 'login':
  //     login();
  //     break;
  //   case 'login-password':
  //     loginPassword();
  //     break;
  //   case 'signup-id':
  //     signUpId();
  //     break;
  //   case 'signup-password':
  //     signUpPassword();
  //     break;
  //   case 'login-passwordless-email-code':
  //     loginPasswordlessEmailCode();
  //     break;
  //   case 'consent':
  //     consent();
  //     break;
  //   default:
  //     console.error('Screen not found', currentScreen, currentPrompt);
  // }
}
