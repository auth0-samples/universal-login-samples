import { LoginPassword } from 'ul-javascript/login-password';
 
export async function render() {
  await import('../../styles/screens/login-password.scss');

  const loginPassword = new LoginPassword();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ loginPassword.screen.texts?.title }</h1>
        <p>${ loginPassword.screen.texts?.description }</p>
      </div>

      <div class='input-container'>
        <label>Enter your username</label>
        <input type='text' id='username' value='${ loginPassword.untrustedData.authParams?.loginHint }' placeholder='Enter your username' disabled />
        <label>Enter your password</label>
        <input type='password' id='password' value='' placeholder='Enter your password' />

        <div class='captcha-container hidden'>
          <img src='${ loginPassword.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a href='${ loginPassword.screen.signupLink }'>Sign Up</a>
          <a href='${ loginPassword.screen.resetPasswordLink }'>Reset Password</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (loginPassword.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (loginPassword.transaction.hasErrors) {
    showErrors();
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $username = ($prompt.querySelector('#username') as HTMLInputElement);
    const $password = ($prompt.querySelector('#password') as HTMLInputElement);
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    $continueButton.addEventListener('click', () => {
      const options = {
        username: $username.value,
        password: $password.value,
        captcha: ''
      }
  
      if (loginPassword.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      loginPassword.continueWithPassword(options);
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

    loginPassword.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
}

