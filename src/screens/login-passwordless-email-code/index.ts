import { LoginPasswordlessEmailCode } from 'ul-javascript/login-passwordless-email-code';
 
export async function render() {
  await import('../../styles/screens/login-passwordless-email-code.scss');

  const passwordlessEmail = new LoginPasswordlessEmailCode();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ passwordlessEmail.screen.texts?.title }</h1>
        <p>${ passwordlessEmail.screen.texts?.description }</p>
      </div>

      <div class='input-container'>
        <label>Email address</label>
        <input type='email' id='email' value='${ passwordlessEmail.untrustedData.authParams.loginHint }' disabled/>
        <label>Enter email code</label>
        <input type='text' id='code' value='' placeholder='Enter email code' />
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a id='resend' href="#">Resend email code</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();
  
  if (passwordlessEmail.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $resend = $prompt.querySelector('#resend') as HTMLButtonElement;
    const $code = ($prompt.querySelector('#code') as HTMLInputElement);

    $continueButton.addEventListener('click', () => {
      const options = {
        email: passwordlessEmail.untrustedData.authParams.loginHint as string,
        code: $code.value
      }
  
      passwordlessEmail.continueWithEmailCode(options);
    });

    $resend.addEventListener('click', (e) => {
      e.preventDefault();
      passwordlessEmail.continueWithResendCode({ email: passwordlessEmail.untrustedData.authParams.loginHint as string });
    });
  }

  // Handle errors.
  function showErrors() {
    const $errorContainer = $prompt.querySelector('.error-container') as HTMLElement;
    $errorContainer.classList.remove('hidden');

    passwordlessEmail.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

