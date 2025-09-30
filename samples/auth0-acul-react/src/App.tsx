import React from "react";
import { useCurrentScreen } from "@auth0/auth0-acul-react";

import LoginScreen from "./screens/login";
import LoginPasswordScreen from "./screens/login-password";
import LoginIdScreen from "./screens/login-id";
import SignupScreen from "./screens/signup";
import SignupIdScreen from "./screens/signup-id";
import SignupPasswordScreen from "./screens/signup-password";
import MfaSmsChallengeScreen from "./screens/mfa-sms-challenge";
import ConsentScreen from "./screens/consent";
import PasskeyEnrollmentScreen from "./screens/passkey-enrollment";
import ResetPasswordScreen from "./screens/reset-password";
import EmailIdentifierChallengeScreen from "./screens/email-identifier-challenge";
import PhoneIdentifierChallengeScreen from "./screens/phone-identifier-challenge";
import MfaPushChallengePushScreen from "./screens/mfa-push-challenge-push";
import MfaDetectBrowserCapabilitiesScreen from "./screens/mfa-detect-browser-capabilities";
import ResetPasswordMfaPushChallengePushScreen from "./screens/reset-password-mfa-push-challenge-push";
import MfaEmailChallengeScreen from "./screens/mfa-email-challenge";
import ResetPasswordRequestScreen from "./screens/reset-password-request";

const screenMap: Record<string, React.FC> = {
  "login": LoginScreen,
  "login-id": LoginIdScreen,
  "login-password": LoginPasswordScreen,
  "signup": SignupScreen,
  "signup-id": SignupIdScreen,
  "signup-password": SignupPasswordScreen,
  "mfa-sms-challenge": MfaSmsChallengeScreen,
  "consent": ConsentScreen,
  "passkey-enrollment": PasskeyEnrollmentScreen,
  "reset-password": ResetPasswordScreen,
  "email-identifier-challenge": EmailIdentifierChallengeScreen,
  "phone-identifier-challenge": PhoneIdentifierChallengeScreen,
  "mfa-push-challenge-push": MfaPushChallengePushScreen,
  "mfa-detect-browser-capabilities": MfaDetectBrowserCapabilitiesScreen,
  "reset-password-mfa-push-challenge-push": ResetPasswordMfaPushChallengePushScreen,
  "mfa-email-challenge": MfaEmailChallengeScreen,
  "reset-password-request": ResetPasswordRequestScreen
};

const App: React.FC = () => {
  const current = useCurrentScreen();
  const screenName = current?.screen?.name;
  const ScreenComponent = screenName ? screenMap[screenName] : undefined;

  return (
    <div>
      {ScreenComponent ? <ScreenComponent /> : <div>No screen rendered</div>}
    </div>
  );
};

export default App;
