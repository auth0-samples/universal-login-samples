import React, { useEffect, Suspense } from "react";
import { currentScreen } from "ul-javascript";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));

const App: React.FC = () => {
  const [screen, setScreen] = React.useState("login-id");
  useEffect(() => {
    const current = currentScreen();
    setScreen(current);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "login-id":
        return <LoginIdScreen />;
      case "login-password":
        return <LoginPasswordScreen />;
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
