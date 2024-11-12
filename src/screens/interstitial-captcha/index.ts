import { InterstitialCaptcha } from 'ul-javascript/interstitial-captcha';
 
export async function render() {
  await import('../../styles/screens/interstitial-captcha.scss');

  const interstitialCaptcha = new InterstitialCaptcha();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ interstitialCaptcha.screen.texts?.title }</h1>
        <p>${ interstitialCaptcha.screen.texts?.description }</p>
      </div>

      <div class='input-container'>
        <div class='captcha-container hidden'>
          <img src='${ interstitialCaptcha.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (interstitialCaptcha.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (interstitialCaptcha.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    $continueButton.addEventListener('click', () => {
      const options = {
        captcha: ''
      }
  
      if (interstitialCaptcha.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      interstitialCaptcha.continueWithCaptcha(options);
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

    interstitialCaptcha.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

