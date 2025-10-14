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
import ResetPasswordEmailScreen from "./screens/reset-password-email";
import ResetPasswordSuccessScreen from "./screens/reset-password-success";
import ResetPasswordErrorScreen from "./screens/reset-password-error";
import MfaBeginEnrollOptionsScreen from "./screens/mfa-begin-enroll-options";
import LoginPasswordlessEmailCodeScreen from "./screens/login-passwordless-email-code";
import LoginPasswordlessSmsOtpScreen from "./screens/login-passwordless-sms-otp";
import LogoutAbortedScreen from "./screens/logout-aborted";
import MfaCountryCodesScreen from "./screens/mfa-country-codes";
import MfaEmailListScreen from "./screens/mfa-email-list";
import MfaEnrollResultScreen from "./screens/mfa-enroll-result";
import MfaLoginOptionsScreen from "./screens/mfa-login-options";
import MfaOtpChallengeScreen from "./screens/mfa-otp-challenge";
import MfaOtpEnrollmentCodeScreen from "./screens/mfa-otp-enrollment-code";
import MfaOtpEnrollmentQrScreen from "./screens/mfa-otp-enrollment-qr";
import MfaPhoneChallengeScreen from "./screens/mfa-phone-challenge";
import MfaPhoneEnrollmentScreen from "./screens/mfa-phone-enrollment";
import MfaPushEnrollmentQrScreen from "./screens/mfa-push-enrollment-qr";
import MfaPushListScreen from "./screens/mfa-push-list";
import MfaPushWelcomeScreen from "./screens/mfa-push-welcome";
import MfaRecoveryCodeChallengeScreen from "./screens/mfa-recovery-code-challenge";
import MfaRecoveryCodeChallengeNewCodeScreen from "./screens/mfa-recovery-code-challenge-new-code";
import MfaRecoveryCodeEnrollmentScreen from "./screens/mfa-recovery-code-enrollment";
import MFASmsEnrollmentScreen from "./screens/mfa-sms-enrollment";
import MFASmsListScreen from "./screens/mfa-sms-list";
import MfaVoiceEnrollmentScreen from "./screens/mfa-voice-enrollment";
import EmailOTPChallengeScreen from "./screens/email-otp-challenge";
import EmailVerificationResultScreen from "./screens/email-verification-result";
import InterstitialCaptchaScreen from "./screens/intertitial-captcha";
import LogoutCompleteScreen from "./screens/logout-complete";
import MfaWebAuthnPlatformEnrollmentScreen from "./screens/mfa-webauthn-platform-enrollment";
import MfaWebAuthnEnrollmentSuccessScreen from "./screens/mfa-webauthn-enrollment-success";
import MfaWebAuthnPlatformChallengeScreen from "./screens/mfa-webauthn-platform-challenge"


const screenMap: Record<string, React.FC> = {
  "login": LoginScreen,
  "login-id": LoginIdScreen,
  "login-passwordless-email-code": LoginPasswordlessEmailCodeScreen,
  "login-passwordless-sms-otp": LoginPasswordlessSmsOtpScreen,
  "logout-complete": LogoutCompleteScreen,
  "logout-aborted": LogoutAbortedScreen,
  "login-password": LoginPasswordScreen,
  "email-otp-challenge": EmailOTPChallengeScreen,
  "email-verification-result": EmailVerificationResultScreen,
  "intertitial-captcha": InterstitialCaptchaScreen,
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
  "reset-password-request": ResetPasswordRequestScreen,
  "reset-password-email": ResetPasswordEmailScreen,
  "reset-password-success": ResetPasswordSuccessScreen,
  "reset-password-error": ResetPasswordErrorScreen,
  "mfa-begin-enroll-options": MfaBeginEnrollOptionsScreen,
  "mfa-country-codes": MfaCountryCodesScreen,
  "mfa-email-list": MfaEmailListScreen,
  "mfa-enroll-result": MfaEnrollResultScreen,
  "mfa-login-options": MfaLoginOptionsScreen,
  "mfa-otp-challenge": MfaOtpChallengeScreen,
  "mfa-otp-enrollment-code": MfaOtpEnrollmentCodeScreen,
  "mfa-otp-enrollment-qr": MfaOtpEnrollmentQrScreen,
  "mfa-phone-challenge": MfaPhoneChallengeScreen,
  "mfa-phone-enrollment": MfaPhoneEnrollmentScreen,
  "mfa-push-enrollment-qr": MfaPushEnrollmentQrScreen,
  "mfa-push-list": MfaPushListScreen,
  "mfa-push-welcome": MfaPushWelcomeScreen,
  "mfa-recovery-code-challenge": MfaRecoveryCodeChallengeScreen,
  "mfa-recovery-code-challenge-new-code": MfaRecoveryCodeChallengeNewCodeScreen,
  "mfa-recovery-code-enrollment": MfaRecoveryCodeEnrollmentScreen,
  "mfa-sms-enrollment": MFASmsEnrollmentScreen,
  "mfa-sms-list": MFASmsListScreen,
  "mfa-voice-enrollment": MfaVoiceEnrollmentScreen,
  "mfa-webauthn-platform-enrollment": MfaWebAuthnPlatformEnrollmentScreen,
  "mfa-webauthn-enrollment-success": MfaWebAuthnEnrollmentSuccessScreen,
  "mfa-webauthn-platform-challenge": MfaWebAuthnPlatformChallengeScreen
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
