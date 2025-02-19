import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
const Login = React.lazy(() => import("./screens/Login"));
const Signup = React.lazy(() => import("./screens/Signup"));
const ResetPasswordRequest = React.lazy(() => import("./screens/ResetPasswordRequest"));
const ResetPasswordEmail = React.lazy(() => import("./screens/ResetPasswordEmail"));
const ResetPassword = React.lazy(() => import("./screens/ResetPassword"));
const ResetPasswordError = React.lazy(() => import("./screens/ResetPasswordError"));
const ResetPasswordSuccess = React.lazy(() => import("./screens/ResetPasswordSuccess"));
const MfaSmsChallengeScreen = React.lazy(() => import("./screens/mfa-sms-challenge"));
const MfaBeginEnrollOptionsScreen = React.lazy(() => import("./screens/mfa-begin-enroll-options"));
const MfaPushWelcomeScreen = React.lazy(() => import("./screens/mfa-push-welcome"));
const MFASmsEnrollmentScreen = React.lazy(() => import("./screens/mfa-sms-enrollment"));
const MfaCountryCodesScreen = React.lazy(() => import("./screens/mfa-country-codes"));
const MfaPushEnrollmentQrScreen = React.lazy(() => import("./screens/mfa-push-enrollment-qr"));
const MFASmsListScreen = React.lazy(() => import("./screens/mfa-sms-list"));
const MfaEmailChallengeScreen = React.lazy(() => import("./screens/mfa-email-challenge"));
const MfaDetectBrowserCapabilitiesScreen = React.lazy(() => import("./screens/mfa-detect-browser-capabilities"));
const MfaLoginOptionsScreen = React.lazy(() => import("./screens/mfa-login-options"));
const MfaEmailListScreen = React.lazy(() => import("./screens/mfa-email-list"));
const MfaPushChallengePushScreen = React.lazy(() => import("./screens/mfa-push-challenge-push"));
const MfaEnrollResultScreen = React.lazy(() => import("./screens/mfa-enroll-result"));


const App: React.FC = () => {
  const [screen, setScreen] = React.useState("login-id");
  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current!);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "login-id":
        return <LoginIdScreen />;
      case "login-password":
        return <LoginPasswordScreen />;
      case "login":
        return <Login />; 
      case "signup":
        return <Signup />;
      case "reset-password-request":
        return <ResetPasswordRequest />;
      case "reset-password-email":
        return <ResetPasswordEmail />;
      case "reset-password":
        return <ResetPassword />;
      case "reset-password-error":
        return <ResetPasswordError />;
      case "reset-password-success":
        return <ResetPasswordSuccess />;
      case "mfa-begin-enroll-options":
        return <MfaBeginEnrollOptionsScreen />
      case "mfa-sms-challenge":
        return <MfaSmsChallengeScreen />;
      case "mfa-sms-enrollment":
        return <MFASmsEnrollmentScreen />;
      case "mfa-push-welcome":
        return <MfaPushWelcomeScreen />;
      case "mfa-country-codes":
        return <MfaCountryCodesScreen />;
      case "mfa-push-enrollment-qr":
        return <MfaPushEnrollmentQrScreen />;
      case "mfa-sms-list":
        return <MFASmsListScreen />;
      case "mfa-email-challenge":
        return <MfaEmailChallengeScreen />;
      case "mfa-detect-browser-capabilities":
        return <MfaDetectBrowserCapabilitiesScreen />;
      case "mfa-login-options":
        return <MfaLoginOptionsScreen />;
      case "mfa-email-list":
        return <MfaEmailListScreen />;
      case "mfa-push-challenge-push":
        return <MfaPushChallengePushScreen />;
      case "mfa-enroll-result":
        return <MfaEnrollResultScreen />;
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
