import { LoginId } from 'ul-javascript/login-id';
import { createFormContainer, createLinks, createErrors, createSeparator, createConnections, createInputBox, renderImage } from './common';
const loginIdManager = new LoginId();
const{ screen, transaction, continueWithFederatedLogin } = loginIdManager;


const formString = `
  <label for="username">Username</label>
  <input type="text" name="username">
  <button type="submit">Sign In</button>
`;

function callback(e: Event) {
  e.preventDefault();
  const $form = e.currentTarget as HTMLFormElement | null
  if (!$form) return;
  const formData = new FormData($form);
  loginIdManager.continueWithUsername({
    username: formData.get('username') as string,
    captcha: formData.get('captcha') as string
  });
}

export function loginId() {
  const $app = createFormContainer('login-id', formString, screen.texts?.description, callback);
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
    //@ts-ignore
    $formContainer?.appendChild(createConnections(transaction.connections, continueWithFederatedLogin));
  }

  document.body.appendChild($app);
}

function renderSimpleCaptcha(){
  if(screen.captcha?.provider === "auth0"){
    const captchaDiv = renderImage(screen.captcha.image as string,"captchaImage")
    const captchaInput = createInputBox("captcha","captcha")
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton?.parentNode?.insertBefore(captchaDiv, submitButton);
    submitButton?.parentNode?.insertBefore(captchaInput, submitButton);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  renderSimpleCaptcha();
});