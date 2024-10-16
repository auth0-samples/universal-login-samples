import { LoginPassword } from 'ul-javascript/login-password';
import { createFormContainer, createErrors } from './common';

const { screen, transaction, submitForm } = new LoginPassword();

const formString = `
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <input type="hidden" name="state" value="${transaction.state}">
  <button type="submit">Sign In</button>
`;

export function loginPassword() {
  const $app = createFormContainer('login-password', formString, screen.texts?.description, submitForm);

  if (transaction.hasErrors) {
    $app.querySelector('.ul-form-container')?.appendChild(createErrors(transaction.errors));
  }

  document.body.appendChild($app);
}