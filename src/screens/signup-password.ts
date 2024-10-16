import { SignupPassword } from 'ul-javascript/signup-password';
import { createFormContainer, createErrors } from './common';

const { screen, transaction, submitForm } = new SignupPassword();

const formString = `
  <label for="password">${ screen.texts?.passwordPlaceholder }</label>
  <input type="password" name="password" placeholder="${ screen.texts?.passwordPlaceholder }">
  <button type="submit">${ screen.texts?.buttonText }</button>
`;

export function signUpPassword() {
  const $app = createFormContainer('signup-password', formString, screen.texts?.description, submitForm);
  const $formContainer = $app.querySelector('.ul-form-container');

  if (!$formContainer) return;

  const $links = document.createElement('div');
  const $signInLink = document.createElement('a');
  $signInLink.textContent = 'Go back';
  $signInLink.classList.add('ul-link');

  $links.classList.add('ul-links');
  $links.append($signInLink);

  $formContainer.appendChild($links);

  if (transaction.hasErrors) {
    $formContainer.appendChild(createErrors(transaction.errors));
  }

  document.body.appendChild($app);
}