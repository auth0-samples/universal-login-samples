
# Universal Login Sample App

This is a sample application to help you build a customized login screen for Auth0 login using React, TypeScript, and Vite.
Universal Login offers a streamlined experience for users and does not require the use of JavaScript for customization.

<img width="956" alt="Screenshot 2024-11-27 at 6 43 07 PM" src="https://github.com/user-attachments/assets/c9c65f79-fe28-41e5-a5b0-83d85d7ae837">

## Prerequisites

Before you start, make sure you have the following:

1. An Auth0 staging or development tenant with an active [custom domain](https://auth0.com/docs/customize/custom-domains).
2. Configure the auth0 tenant to use the [Identifier First Authentication Profile](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first).
3. A [React quickstart](https://github.com/auth0-samples/auth0-react-samples/tree/master/Sample-01) application configured to run with your custom domain.
4. Configure [Application metadata](https://auth0.com/docs/get-started/applications/application-settings) to run quickstart.

## Getting Started

Follow these steps to get the application up and running locally:

### 1. Clone the Repository

```sh
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Build the Application

```sh
npm run build
```

### 4. Serve the Application

After building the application, you can serve it locally using `http-server`:

```sh
npx http-server dist -p 3032
```

This will start a local server on port 3032. You can access the application by navigating to `http://127.0.0.1:3032` in your web browser.

### 5. Test the Application with sample quickstart

Go to your quickstart applicaiton and Login.

## How the Login Works

### Creating and Appending the Root Element

In the `src/main.tsx` file, we create a `div` element and append it to the `body` of the document. This is necessary for the Universal Login to work correctly. Here is the relevant code:

```tsx
const rootElement = document.createElement("div");
rootElement.id = "root";

document.body.appendChild(rootElement);
document.body.style.overflow = "hidden";
```

### Initializing Screen Objects LoginId, LoginPassword ...

In the src/screens/LoginId/index.tsx file, we initialize an object for the LoginId screen. This allows us to manage the state and behavior specific to this screen.

```tsx
import React, { useState } from "react";
import LoginIdInstance from "ul-javascript";

const LoginIdScreen: React.FC = () => {
  const [loginIdManager] = useState(() => new LoginIdInstance()); //lazy initialization

  const handleLogin = () => {
    //Logic for continue
    loginIdManager.login({username:"", captcha: ""})
  }

  return (
    <div>
      {/* Render the login ID screen content */}
      <button onclick={handleLogin}>Continue<button>
    </div>
  );
};

export default LoginIdScreen;
```

### Error handling for login ...

In the src/screens/LoginId/index.tsx file, we initialize an object for the LoginId screen. This allows us to manage the state and behavior specific to this screen.

```tsx
import React, { useState } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";

const LoginIdScreen: React.FC = () => {
  const [loginIdManager] = useState(() => new LoginIdInstance()); //lazy initialization

  const errors = loginIdManager.getError();

  const handleLogin = () => {
    //Logic for continue
    loginIdManager.login({username:"", captcha: ""})
  }

  return (
    <div>
      {/* Render the login ID screen content */}
      <button onclick={handleLogin}>Continue<button>
      {loginIdManager.transaction.hasErrors && errors && (
        // A custom React component that renders a <div> with error details
        <ErrorMessages errors={errors} />
      )}
    </div>
  );

export default LoginScreen;
```

## Additional Information

- This project uses Vite for fast development and build processes.
- ESLint is configured to enforce code quality and consistency.
- SCSS is used for styling, with a focus on modular and reusable styles.

For more details on how to customize and extend this application, refer to the official documentation of the libraries and tools used:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Auth0](https://auth0.com/)

### Have Fun with Your Own Coding Style!

Feel free to use your own coding style to create beautiful login pages. Customize the styles, add animations, and make the user experience delightful.
