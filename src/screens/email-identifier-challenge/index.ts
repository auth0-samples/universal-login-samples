import { EmailIdentifierChallenge } from 'ul-javascript/email-identifier-challenge';
 
export async function render() {
  await import('../../styles/screens/email-identifier-challenge.scss');

  const emailChallenge = new EmailIdentifierChallenge();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ emailChallenge.screen.texts?.title }</h1>
        <p>${ emailChallenge.screen.texts?.pageTitle }</p>
        <p>${ emailChallenge.screen.texts?.emailDescription } ${ emailChallenge.screen?.data?.email }</p>
      </div>

      <div class='input-container'>
        <label>${ emailChallenge.screen.texts?.placeholder }</label>
        <input type='text' id='otp' value='' placeholder='${ emailChallenge.screen.texts?.placeholder }' />

        <div class='captcha-container hidden'>
          <img src='${ emailChallenge.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a id='resend' href="#">Resend Code</a>
          <a id='goBack' href="#">${ emailChallenge.screen.texts?.backButtonText }</a>
        </div>

        <div class='links-container'>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (emailChallenge.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (emailChallenge.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $resend = $prompt.querySelector('#resend') as HTMLButtonElement;
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    const $otp = ($prompt.querySelector('#otp') as HTMLInputElement);
    const $goBack = $prompt.querySelector('#goBack') as HTMLButtonElement;

    $continueButton.addEventListener('click', async () => {
      const options = {
        code: $otp.value,
        captcha: ''
      }

      if (emailChallenge.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      await emailChallenge.continueWithCode(options);
    });

    $resend.addEventListener('click', async (e) => {
      e.preventDefault();
      await emailChallenge.resendCode({});
    });

    $goBack.addEventListener('click', async (e) => {
      e.preventDefault();
      await emailChallenge.goBack({});
    });
  }

  // Handle CAPTCHA.
  function showCaptcha() {
    const $captchaContainer = $prompt.querySelector('.captcha-container') as HTMLElement;
    $captchaContainer.classList.remove('hidden');
  }

  // Handle errors.
  function showErrors() {
    const $errorContainer = $prompt.querySelector('.error-container') as HTMLElement;
    $errorContainer.classList.remove('hidden');

    emailChallenge.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

