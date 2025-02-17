import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import MfaBeginEnrollOptionsScreen from "./screens/mfa-begin-enroll-options";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
const Login = React.lazy(() => import("./screens/Login"));
const Signup = React.lazy(() => import("./screens/Signup"));
const ResetPasswordRequest = React.lazy(() => import("./screens/ResetPasswordRequest"));
const ResetPasswordEmail = React.lazy(() => import("./screens/ResetPasswordEmail"));
const ResetPassword = React.lazy(() => import("./screens/ResetPassword"));
const ResetPasswordError = React.lazy(() => import("./screens/ResetPasswordError"));
const ResetPasswordSuccess = React.lazy(() => import("./screens/ResetPasswordSuccess"));

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
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
