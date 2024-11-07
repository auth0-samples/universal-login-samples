import { currentScreen } from 'ul-javascript';
import { render as loginId } from './screens/login-id';
import { render as loginPassword } from './screens/login-password';
import { render as signupId } from './screens/signup-id';
import { render as passwordlessEmail } from './screens/login-passwordless-email-code';
import { render as passwordlessSms } from './screens/login-passwordless-sms-otp';
import { render as signupPassword } from './screens/signup-password';
import { render as passkeyEnrollment } from './screens/passkey-enrollment';
import { render as passkeyEnrollmentLocal } from './screens/passkey-enrollment-local';

switch (currentScreen()) {
  case 'login-id':
    loginId();
    break;
  case 'login-password':
    loginPassword();
    break;
  case 'signup-id':
    signupId();
    break;
  case 'signup-password':
    signupPassword();
    break;
  case 'login-passwordless-email-code':
    passwordlessEmail();
    break;
  case 'login-passwordless-sms-otp':
    passwordlessSms();
    break;
  case 'passkey-enrollment':
    passkeyEnrollment();
    break;
  case 'passkey-enrollment-local':
    passkeyEnrollmentLocal();
    break;
  default:
    console.error("Unknown screen");
}

