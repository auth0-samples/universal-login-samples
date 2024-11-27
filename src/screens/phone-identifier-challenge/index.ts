import PhoneIdentifierChallenge from 'ul-javascript/phone-identifier-challenge';
 
export async function render() {
  await import('../../styles/screens/phone-identifier-challenge.scss');

  const phoneChallenge = new PhoneIdentifierChallenge();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ phoneChallenge.screen.getScreenTexts()?.title }</h1>
        <p>${ phoneChallenge.screen.getScreenTexts()?.pageTitle }</p>
        <p>${ phoneChallenge.screen.getScreenTexts()?.smsDescription }</p>
      </div>

      <div class='input-container'>
        <label>${ phoneChallenge.screen.getScreenTexts()?.placeholder }</label>
        <input type='text' id='otp' value='' placeholder='${ phoneChallenge.screen.getScreenTexts()?.placeholder }' />

        <div class='captcha-container hidden'>
          <img src='${ phoneChallenge.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <label>${ phoneChallenge.screen.getScreenTexts()?.resendText }</label>
          <a id='resend' href="#">Resend OTP</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (phoneChallenge.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (phoneChallenge.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $resend = $prompt.querySelector('#resend') as HTMLButtonElement;
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    const $otp = ($prompt.querySelector('#otp') as HTMLInputElement);

    $continueButton.addEventListener('click', async () => {
      const options = {
        code: $otp.value,
        captcha: ''
      }

      if (phoneChallenge.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      await phoneChallenge.continueWithCode(options);
    });

    $resend.addEventListener('click', async (e) => {
      e.preventDefault();
      await phoneChallenge.resendCode({});
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

    phoneChallenge.transaction.getErrors()?.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

