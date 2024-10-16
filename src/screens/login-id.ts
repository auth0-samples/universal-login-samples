import { LoginId } from 'ul-javascript/login-id';
import { createFormContainer, createLinks, createErrors, createSeparator, createConnections } from './common';
const { screen, transaction, submitForm, submitFederatedLoginForm } = new LoginId();

const formString = `
  <label for="username">Username</label>
  <input type="text" name="username">
  <button type="submit">Sign In</button>
`;

export function loginId() {
  const $app = createFormContainer('login-id', formString, screen.texts?.description, submitForm);
  const $formContainer = $app.querySelector('.ul-form-container');

  if (screen.isSignupEnabled) {
    const $links = createLinks(screen.signupLink, screen.passwordResetLink);
    $formContainer?.appendChild($links);
  }

  if (transaction.hasErrors) {
    $formContainer?.appendChild(createErrors(transaction.errors));
  }

  if (transaction.hasConnections) {
    $formContainer?.appendChild(createSeparator());
    $formContainer?.appendChild(createConnections(transaction.connections, submitFederatedLoginForm));
  }

  document.body.appendChild($app);
}