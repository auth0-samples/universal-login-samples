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
