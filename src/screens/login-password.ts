import { LoginPassword } from 'ul-javascript';
import { createFormContainer, createErrors } from './common';

const loginPasswordManager = new LoginPassword();
const{ screen, transaction } = loginPasswordManager;

function callback(e: Event) {
  e.preventDefault();
  const $form = e.currentTarget as HTMLFormElement | null
  if (!$form) return;
  const formData = new FormData($form);
  loginPasswordManager.continueWithPassword({password: formData.get('password') as string});
}

const formString = `
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <input type="hidden" name="state" value="${transaction.state}">
  <button type="submit">Sign In</button>
`;

export function loginPassword() {
  const $app = createFormContainer('login-password', formString, screen.texts?.description, callback);

  if (transaction.hasErrors) {
    $app.querySelector('.ul-form-container')?.appendChild(createErrors(transaction.errors));
  }

  document.body.appendChild($app);
}