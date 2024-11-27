import LoginPasswordlessSmsOtp from 'ul-javascript/login-passwordless-sms-otp';
 
export async function render() {
  await import('../../styles/screens/login-passwordless-sms-otp.scss');

  const passwordlessSms = new LoginPasswordlessSmsOtp();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ passwordlessSms.screen.getScreenTexts()?.title }</h1>
        <p>${ passwordlessSms.screen.getScreenTexts()?.description }</p>
      </div>

      <div class='input-container'>
        <label>Email address</label>
        <input type='tel' id='phone' value='${ passwordlessSms.untrustedData.getAuthParams()?.loginHint }' disabled/>
        <label>Enter OTP</label>
        <input type='text' id='otp' value='' placeholder='Enter OTP' />
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a id='resend' href="#">Resend OTP</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();
  
  if (passwordlessSms.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $resend = $prompt.querySelector('#resend') as HTMLButtonElement;
    const $otp = ($prompt.querySelector('#otp') as HTMLInputElement);

    $continueButton.addEventListener('click', () => {
      const options = {
        username: passwordlessSms.untrustedData.getAuthParams()?.loginHint as string,
        otp: $otp.value
      }
  
      passwordlessSms.continueWithSmsOtp(options);
    });

    $resend.addEventListener('click', (e) => {
      e.preventDefault();
      passwordlessSms.continueWithResendOtp({ username: passwordlessSms.untrustedData.getAuthParams()?.loginHint as string });
    });
  }

  // Handle errors.
  function showErrors() {
    const $errorContainer = $prompt.querySelector('.error-container') as HTMLElement;
    $errorContainer.classList.remove('hidden');

    passwordlessSms.transaction.getErrors()?.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

