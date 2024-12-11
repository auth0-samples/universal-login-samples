import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "auth0-acul-js";
import "./index.css";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
const LoginIdIkea = React.lazy(() => import("./screens/LoginIdIkea"));

const App: React.FC = () => {
  const [screen, setScreen] = React.useState("login-id");
  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current!);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "login-id":
        return <LoginIdIkea />;
      case "login-password":
        return <LoginPasswordScreen />;
      default:
        return <LoginIdScreen />;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
