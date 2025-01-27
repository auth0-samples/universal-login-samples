import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
const Login = React.lazy(() => import("./screens/Login"));
const Signup = React.lazy(() => import("./screens/Signup"));
const ResetPasswordRequest = React.lazy(() => import("./screens/ResetPasswordRequest"));
const ResetPasswordEmail = React.lazy(() => import("./screens/ResetPasswordEmail"));
const ResetPassword = React.lazy(() => import("./screens/ResetPassword"));


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
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
