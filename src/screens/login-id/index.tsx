// App.tsx
import { useState } from 'react';
import { Auth0AculProvider, useCurrentScreen } from '@auth0/auth0-acul-react/login-id';

function LoginIdScreen() {
  const screen = useCurrentScreen();
  const texts = screen.screen.texts;

  const [username, setUsername] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [log, setLog] = useState('');

  const handleLogin = () => {
    try {
      screen.login({
        username,
        captcha: screen.screen.isCaptchaAvailable ? captcha : undefined,
      });
      setLog('✅ Login triggered');
    } catch (error) {
      setLog(`❌ Login failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-md space-y-6">
      <div className="text-center">
        {screen.client.logoUrl && (
          <img
            src={screen.client.logoUrl}
            alt={texts?.logoAltText || 'Auth0 Logo'}
            className="h-12 mx-auto mb-4"
          />
        )}
        <h1 className="text-2xl font-bold">
          {texts?.title ?? 'Welcome'}
        </h1>
        <p className="text-gray-600">
          {texts?.description ?? 'Please enter your identifier to continue.'}
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder={
            texts?.usernamePlaceholder ??
            texts?.usernameOrEmailPlaceholder ??
            'Username or email'
          }
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {screen.screen.isCaptchaAvailable && (
          <div className="space-y-2">
            {screen.screen.captchaImage && (
              <img src={screen.screen.captchaImage} alt="CAPTCHA" className="h-12" />
            )}
            <input
              type="text"
              placeholder={texts?.captchaCodePlaceholder ?? 'Enter CAPTCHA'}
              className="w-full px-4 py-2 border rounded"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </div>
        )}

        {screen.transaction.hasErrors && (
          <div className="bg-red-100 border border-red-300 p-3 rounded space-y-2">
            {screen.transaction.errors?.map((err, i) => (
              <p key={i} className="text-sm text-red-600">{err.message}</p>
            ))}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {texts?.buttonText ?? 'Continue'}
        </button>

        <div className="flex justify-between text-sm text-blue-600 mt-2">
          {screen.screen.signupLink && (
            <a href={screen.screen.signupLink}>
              {texts?.signupActionText ?? 'Sign Up'}
            </a>
          )}
          {screen.screen.resetPasswordLink && (
            <a href={screen.screen.resetPasswordLink}>
              {texts?.forgotPasswordText ?? 'Reset Password'}
            </a>
          )}
        </div>

        {screen.transaction.isPasskeyEnabled && (
          <div className="mt-4">
            <button
              onClick={() => screen.passkeyLogin({})}
              className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {texts?.passkeyButtonText ?? 'Continue with a passkey'}
            </button>
          </div>
        )}

        {screen.transaction.alternateConnections && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              {texts?.separatorText ?? 'Or continue with'}
            </p>
            {screen.transaction.alternateConnections?.map((conn) => (
              <button
                key={conn.name}
                onClick={() => screen.socialLogin({ connection: conn.name })}
                className="w-full py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                {conn.name ?? `Login with ${conn.name}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {log && <p className="text-center text-sm text-gray-600">{log}</p>}
    </div>
  );
}

export default function App() {
  return (
    <Auth0AculProvider>
      <LoginIdScreen />
    </Auth0AculProvider>
  );
}
