import { Consent } from 'ul-javascript/consent';
import { createFormContainer, createErrors } from './common';

const { screen, transaction, submitForm } = new Consent();

const formString = `
  <input type="hidden" name="action" id="action-hidden" value="" />
  <input name="audience" type="hidden" value="https://tenant-nandan.us.auth0.com/userinfo">
  <button type="submit" class="ul-button-danger" data-action="deny">
    ${screen.texts?.declineButtonText}
  </button>
  <button type="submit" data-action="accept">
    ${screen.texts?.acceptButtonText}
  </button>
`;

export function consent() {
  const $app = createFormContainer('consent', formString, screen.texts?.messageSingleTenant, submitForm);
  const $form = $app.querySelector('form');
  const $formContainer = $app.querySelector('.ul-form-container');
  const $hiddenAction = $form?.querySelector('#action-hidden') as HTMLInputElement | null;

  $form?.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action');
      if (action && $hiddenAction) {
        $hiddenAction.value = action; 
      }
    });
  });

  if (transaction.hasErrors) {
    $formContainer?.appendChild(createErrors(transaction.errors));
  }

  document.body.appendChild($app);
}
