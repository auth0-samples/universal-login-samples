import SignupPassword from 'ul-javascript/signup-password';
 
export async function render() {
  await import('../../styles/screens/signup-password.scss');

  const signupPassword = new SignupPassword();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ signupPassword.screen.getScreenTexts()?.title }</h1>
        <p>${ signupPassword.screen.getScreenTexts()?.description }</p>
      </div>

      <div class='input-container'>
        <label>Enter your email</label>
        <input type='text' id='email' value='${ signupPassword.untrustedData.getAuthParams()?.loginHint }' placeholder='Enter your email' disabled />
        <label>Enter your password</label>
        <input type='password' id='password' value='' placeholder='Enter your password' />

        <div class='captcha-container hidden'>
          <img src='${ signupPassword.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a href='${ signupPassword.screen.loginLink }'>Sign In</a>
          <a href='${ signupPassword.screen.editLink }'>Go back</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (signupPassword.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (signupPassword.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  // Handle Username/Email signup.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    // const $username = ($prompt.querySelector('#username') as HTMLInputElement);
    const $password = ($prompt.querySelector('#password') as HTMLInputElement);
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    $continueButton.addEventListener('click', () => {
      const options = {
        email: signupPassword.untrustedData.getAuthParams()?.loginHint as string,
        // username: $username.value,
        password: $password.value,
        captcha: ''
      }
  
      if (signupPassword.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      signupPassword.continueWithEmailPassword(options);
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

    signupPassword.transaction.getErrors()?.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

