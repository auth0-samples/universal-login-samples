import { LoginPasswordlessSmsOtp } from 'ul-javascript/login-passwordless-sms-otp';
import { createFormContainer, createLinks, createErrors, createSeparator, createConnections } from './common';

const { screen, transaction, submitForm, submitData } = new LoginPasswordlessSmsOtp();

const formString = `
  <label for="code">Email Code</label>
  <input type="text" name="code">
  <button type="submit" name="action" value="default">Sign In</button>
  <button id="resend" type="button" value="resend">Resend Code</button>
`;

export function loginPasswordlessSmsOtp() {
  const $app = createFormContainer('login-passwordless-email-code', formString, screen.texts?.description, submitForm);
  const $formContainer = $app.querySelector('.ul-form-container');
  const $resend = $app.querySelector('#resend');

  $resend?.addEventListener('click', function(e) {
    e.preventDefault();
    submitData({ action: 'resend' });
  });

  if (screen.isSignupEnabled) {
    const $links = createLinks(screen.signupLink, screen.passwordResetLink);
    $formContainer?.appendChild($links);
  }

  if (transaction.hasErrors) {
    $formContainer?.appendChild(createErrors(transaction.errors));
  }

  if (transaction.hasConnections) {
    $formContainer?.appendChild(createSeparator());
    $formContainer?.appendChild(createConnections(transaction.connections, submitForm));
  }

  document.body.appendChild($app);
}