import { SignupId } from 'ul-javascript/signup-id';
import { createFormContainer, createErrors, createConnections, createSeparator } from './common';

const { screen, transaction, submitForm, submitData } = new SignupId();

const formString = `
  <label for="username">${ screen.texts?.emailPlaceholder }</label>
  <input type="text" name="email" placeholder="${ screen.texts?.emailPlaceholder }">
  <button type="submit">${ screen.texts?.buttonText }</button>
`;

function callback(e: Event) {
  e.preventDefault();
  const $form = e.currentTarget as HTMLFormElement | null
  if (!$form) return;
  const formData = new FormData($form);
  submitData({email: formData.get('email') as string});
}

export function signUpId() {
  const $app = createFormContainer('signup-id', formString, screen.texts?.description, callback);
  const $formContainer = $app.querySelector('.ul-form-container');

  if (!$formContainer) return;

  const $links = document.createElement('div');
  const $hintText = document.createElement('div');
  const $signInLink = document.createElement('a');
  $signInLink.textContent = screen.texts?.signInText || '';
  $signInLink.classList.add('ul-link');

  $links.classList.add('ul-links');
  $links.append($signInLink);
  $links.append($hintText);
  $hintText.textContent = screen.texts?.footerText || '';
  $hintText.classList.add('ul-reset-password', 'ul-link');

  $formContainer.appendChild($links);

  if (transaction.hasErrors) {
    $formContainer.appendChild(createErrors(transaction.errors));
  }

  if (transaction.hasConnections) {
    $formContainer.appendChild(createSeparator());
    $formContainer.appendChild(createConnections(transaction.connections, submitForm));
  }

  document.body.appendChild($app);
}