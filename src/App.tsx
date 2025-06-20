import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";
const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
const Login = React.lazy(() => import("./screens/Login"));
const Signup = React.lazy(() => import("./screens/Signup"));
const SignupId = React.lazy(() => import("./screens/signup-id"));
const SignupPassword = React.lazy(() => import("./screens/signup-password"));
const ResetPasswordRequest = React.lazy(() => import("./screens/ResetPasswordRequest"));
const LoginPasswordlessEmailCodeScreen = React.lazy(() => import("./screens/login-passwordless-email-code"));
const LoginPasswordlessSmsOtpScreen = React.lazy(() => import("./screens/login-passwordless-sms-otp"));
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
const MfaPushListScreen = React.lazy(() => import("./screens/mfa-push-list"));
const MfaOtpChallengeScreen = React.lazy(() => import("./screens/mfa-otp-challenge"));
const MfaOtpEnrollmentQrScreen = React.lazy(() => import("./screens/mfa-otp-enrollment-qr"));
const MfaOtpEnrollmentCodeScreen = React.lazy(() => import("./screens/mfa-otp-enrollment-code"));
const ResetPasswordMfaEmailChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-email-challenge"));
const ResetPasswordMfaPushChallengePushScreen = React.lazy(() => import("./screens/reset-password-mfa-push-challenge-push"));
const ResetPasswordMfaSmsChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-sms-challenge"));
const ResetPasswordMfaOtpChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-otp-challenge"));
const OrganizationSelectionScreen = React.lazy(() => import("./screens/organization-selection"));
const OrganizationPickerScreen = React.lazy(() => import("./screens/organization-picker"));
const AcceptInvitationScreen = React.lazy(() => import("./screens/accept-invitation"));
// const CustomizedConsentScreen = React.lazy(() => import("./screens/customized-consent"));
const MfaPhoneEnrollmentScreen = React.lazy(() => import("./screens/mfa-phone-enrollment"));
const MfaVoiceEnrollmentScreen = React.lazy(() => import("./screens/mfa-voice-enrollment"));
const MfaRecoveryCodeChallengeScreen = React.lazy(() => import("./screens/mfa-recovery-code-challenge"));
const DeviceCodeActivationAllowedScreen = React.lazy(() => import("./screens/device-code-activation-allowed"));
const DeviceCodeActivationDeniedScreen = React.lazy(() => import("./screens/device-code-activation-denied"));
const DeviceCodeActivationScreen = React.lazy(() => import("./screens/device-code-activation"));
const MfaVoiceChallengeScreen = React.lazy(() => import("./screens/mfa-voice-challenge"))
const ResetPasswordMfaRecoveryCodeChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-recovery-code-challenge"));
const ResetPasswordMfaVoiceChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-voice-challenge"));
const RedeemTicketScreen = React.lazy(() => import("./screens/redeem-ticket"));
const DeviceCodeConfirmationScreen = React.lazy(() => import("./screens/device-code-confirmation"));
const MfaPhoneChallengeScreen = React.lazy(() => import("./screens/mfa-phone-challenge"));
const MfaRecoveryCodeEnrollmentScreen = React.lazy(() => import("./screens/mfa-recovery-code-enrollment"));
const ResetPasswordMfaPhoneChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-phone-challenge"));
const PasskeyEnrollmentScreen = React.lazy(() => import("./screens/passkey-enrollment"));
const PasskeyEnrollmentLocalScreen = React.lazy(() => import("./screens/passkey-enrollment-local"));
const MfaRecoveryCodeChallengeNewCodeScreen = React.lazy(() => import("./screens/mfa-recovery-code-challenge-new-code"));
// const EmailOTPChallengeScreen = React.lazy(() => import("./screens/email-otp-challenge"));
const LogoutScreen = React.lazy(() => import("./screens/logout"));
const LogoutAbortedScreen = React.lazy(() => import("./screens/logout-aborted"));
const LogoutCompleteScreen = React.lazy(() => import("./screens/logout-complete"));
const EmailVerificationResultScreen = React.lazy(() => import("./screens/email-verification-result"));
const EmailIdentifierChallengeScreen = React.lazy(() => import("./screens/email-identifier-challenge"));
const LoginEmailVerificationScreen = React.lazy(() => import("./screens/login-email-verification"));
const MfaWebAuthnErrorScreen = React.lazy(() => import("./screens/mfa-webauthn-error"));
const MfaWebAuthnPlatformEnrollmentScreen = React.lazy(() => import("./screens/mfa-webauthn-platform-enrollment"));
// const MfaWebAuthnNotAvailableErrorScreen = React.lazy(() => import("./screens/mfa-webauthn-not-available-error"))
const MfaWebAuthnRoamingEnrollment = React.lazy(() => import("./screens/mfa-webauthn-roaming-enrollment"))
const MfaWebAuthnRoamingChallengeScreen = React.lazy(() => import("./screens/mfa-webauthn-roaming-challenge"));
const MfaWebAuthnPlatformChallengeScreen = React.lazy(() => import("./screens/mfa-webauthn-platform-challenge"));
const MfaWebAuthnEnrollmentSuccessScreen = React.lazy(() => import("./screens/mfa-webauthn-enrollment-success"));
const MfaWebAuthnChangeKeyNicknameScreen = React.lazy(() => import("./screens/mfa-webauthn-change-key-nickname"));
const PhoneIdentifierChallengeScreen = React.lazy(() => import("./screens/phone-identifier-challenge"));
const PhoneIdentifierEnrollmentScreen = React.lazy(() => import("./screens/phone-identifier-enrollment"));
const InterstitialCaptchaScreen = React.lazy(() => import("./screens/intertitial-captcha"));
// const ResetPasswordMfaWebAuthnRoamingChallengeComponent = React.lazy(() => import("./screens/reset-password-mfa-webauthn-roaming-challenge"));
// const ConsentScreen = React.lazy(() => import("./screens/consent"));
const ConsentScreen = React.lazy(() => import("./screens/consent"));
const BruteForceProtectionUnblock = React.lazy(() => import("./screens/brute-force-protection-unblock"));
const BruteForceProtectionUnblockSuccess = React.lazy(() => import("./screens/brute-force-protection-unblock-success"));
const BruteForceProtectionUnblockFailure = React.lazy(() => import("./screens/brute-force-protection-unblock-failure"));
const ResetPasswordMfaWebAuthnRoamingChallengeComponent = React.lazy(() => import("./screens/reset-password-mfa-webauthn-roaming-challenge"));
const ResetPasswordMfaWebAuthnPlatformChallengeScreen = React.lazy(() => import("./screens/reset-password-mfa-webauthn-platform-challenge"));

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
      case "login-passwordless-email-code":
        return <LoginPasswordlessEmailCodeScreen />;
      case "login-passwordless-sms-otp":
        return <LoginPasswordlessSmsOtpScreen />;
      case "email-identifier-challenge":
        return <EmailIdentifierChallengeScreen />;
      case "signup":
        return <Signup />;
      case "signup-id":
        return < SignupId/>;
      case "signup-password":
        return <SignupPassword />;
      case "reset-password-request":
        return <ResetPasswordRequest />;
      case "intertitial-captcha":
        return <InterstitialCaptchaScreen />;
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
      case "mfa-push-list":
        return <MfaPushListScreen />;
      case "mfa-otp-challenge":
        return <MfaOtpChallengeScreen />;
      case "mfa-otp-enrollment-qr":
        return <MfaOtpEnrollmentQrScreen />;
      case "mfa-otp-enrollment-code":
        return <MfaOtpEnrollmentCodeScreen />;
      case "reset-password-mfa-email-challenge":
        return <ResetPasswordMfaEmailChallengeScreen />;
      case "reset-password-mfa-push-challenge-push":
        return <ResetPasswordMfaPushChallengePushScreen />;
      case "reset-password-mfa-sms-challenge":
        return <ResetPasswordMfaSmsChallengeScreen />;
      case "reset-password-mfa-otp-challenge":
        return <ResetPasswordMfaOtpChallengeScreen />;
      case "organization-selection":
        return <OrganizationSelectionScreen />;
      case "organization-picker":
        return <OrganizationPickerScreen />;
      case "phone-identifier-challenge":
        return <PhoneIdentifierChallengeScreen />;
      case "phone-identifier-enrollment":
        return <PhoneIdentifierEnrollmentScreen />;
      case "accept-invitation":
        return <AcceptInvitationScreen />;
      // case "customized-consent":
      //   return <CustomizedConsentScreen />;
      case "mfa-phone-enrollment":
        return <MfaPhoneEnrollmentScreen />;
      case "mfa-voice-enrollment":
        return <MfaVoiceEnrollmentScreen />;
      case "mfa-recovery-code-challenge":
        return <MfaRecoveryCodeChallengeScreen />;
      case "device-code-activation-allowed":
        return <DeviceCodeActivationAllowedScreen />;
      case "device-code-activation-denied":
        return <DeviceCodeActivationDeniedScreen />;
      case "device-code-activation":
        return <DeviceCodeActivationScreen />;
      case "mfa-voice-challenge":
        return <MfaVoiceChallengeScreen />;
      case "reset-password-mfa-recovery-code-challenge":
        return <ResetPasswordMfaRecoveryCodeChallengeScreen />;
      case "reset-password-mfa-voice-challenge":
        return <ResetPasswordMfaVoiceChallengeScreen />;
      case "redeem-ticket":
        return <RedeemTicketScreen />;
      case "device-code-confirmation":
        return <DeviceCodeConfirmationScreen />;
      case "mfa-phone-challenge":
        return <MfaPhoneChallengeScreen />;
      case "mfa-recovery-code-enrollment":
        return <MfaRecoveryCodeEnrollmentScreen />;
      case "reset-password-mfa-phone-challenge":
        return <ResetPasswordMfaPhoneChallengeScreen />;
      case "passkey-enrollment":
        return <PasskeyEnrollmentScreen />;
      case "passkey-enrollment-local":
        return <PasskeyEnrollmentLocalScreen />;
      case "mfa-recovery-code-challenge-new-code":
        return <MfaRecoveryCodeChallengeNewCodeScreen />;
      // case "email-otp-challenge":
      //   return <EmailOTPChallengeScreen />;
      case "logout":
        return <LogoutScreen />;
      case "logout-aborted":
        return <LogoutAbortedScreen />;
      case "logout-complete":
        return <LogoutCompleteScreen />;
      case "email-verification-result":
        return <EmailVerificationResultScreen />;
      case "login-email-verification":
        return <LoginEmailVerificationScreen />;
      case "mfa-webauthn-error":
        return <MfaWebAuthnErrorScreen />;
      case "mfa-webauthn-platform-enrollment":
        return <MfaWebAuthnPlatformEnrollmentScreen />;
      // case "mfa-webauthn-not-available-error":
      //   return <MfaWebAuthnNotAvailableErrorScreen />
      case "mfa-webauthn-roaming-enrollment": 
        return <MfaWebAuthnRoamingEnrollment />
      case "mfa-webauthn-roaming-challenge":
        return <MfaWebAuthnRoamingChallengeScreen />
      case "mfa-webauthn-platform-challenge":
        return <MfaWebAuthnPlatformChallengeScreen />
      case "mfa-webauthn-enrollment-success": 
        return <MfaWebAuthnEnrollmentSuccessScreen />
      case "reset-password-mfa-webauthn-platform-challenge":
        return <ResetPasswordMfaWebAuthnPlatformChallengeScreen />;
      case "consent":
        return <ConsentScreen />;
      case "brute-force-protection-unblock":
        return <BruteForceProtectionUnblock/>
      case "brute-force-protection-unblock-success":
        return <BruteForceProtectionUnblockSuccess/>
      case "brute-force-protection-unblock-failure":
        return <BruteForceProtectionUnblockFailure/>
      case "mfa-webauthn-change-key-nickname":
        return <MfaWebAuthnChangeKeyNicknameScreen />
      case "reset-password-mfa-webauthn-roaming-challenge":
          return <ResetPasswordMfaWebAuthnRoamingChallengeComponent />;
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
