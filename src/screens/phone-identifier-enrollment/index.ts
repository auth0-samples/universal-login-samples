import PhoneIdentifierEnrollment from 'ul-javascript/phone-identifier-enrollment';
 
export async function render() {
  await import('../../styles/screens/phone-identifier-enrollment.scss');
  
  const phoneEnrollment = new PhoneIdentifierEnrollment();
  let selectedType =  phoneEnrollment.screen.getScreenData()?.message_type;
  
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ phoneEnrollment.screen.getScreenTexts()?.title }</h1>
        <p>${ phoneEnrollment.screen.getScreenTexts()?.pageTitle }</p>
        <p>${ phoneEnrollment.screen.getScreenTexts()?.smsDescription }</p>
      </div>

      <div class='input-container'>
        <label>${ phoneEnrollment.screen.getScreenTexts()?.placeholder }</label>
        <input type='text' id='otp' value='${ phoneEnrollment.screen.getScreenData()?.phone_number }' placeholder='${ phoneEnrollment.screen.getScreenTexts()?.placeholder }' disabled/>

        <div class='captcha-container hidden'>
          <img src='${ phoneEnrollment.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>

        <div class='enrollment-types'>
          <button id='type-text'>Text</button>
          <button id='type-voice'>Voice</button>
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>
      </div>

      <div class='links-container'>
        <a id='goBack' href="#">${ phoneEnrollment.screen.getScreenTexts()?.backButtonText }</a>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (phoneEnrollment.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (phoneEnrollment.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    const $textButton = $prompt.querySelector('#type-text') as HTMLButtonElement;
    const $voiceButton = $prompt.querySelector('#type-voice') as HTMLButtonElement;
    const $goBack = $prompt.querySelector('#goBack') as HTMLButtonElement;

    if (selectedType == 'text') {
      $textButton.classList.add('selected');
    } else {
      $voiceButton.classList.add('selected');
    }

    $textButton.addEventListener('click', () => {
      $voiceButton.classList.remove('selected');
      $textButton.classList.add('selected');
      selectedType = 'text';
    });

    $voiceButton.addEventListener('click', () => {
      $textButton.classList.remove('selected');
      $voiceButton.classList.add('selected');
      selectedType = 'voice';
    });

    $continueButton.addEventListener('click', async () => {
      const options = {
        type: selectedType as 'voice' | 'text',
        captcha: ''
      }

      if (phoneEnrollment.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      await phoneEnrollment.continuePhoneEnrollment(options);
    });

    $goBack.addEventListener('click', async (e) => {
      e.preventDefault();
      await phoneEnrollment.goBack({});
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

    phoneEnrollment.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

