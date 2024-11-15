import SignupId from 'ul-javascript/signup-id';
 
export async function render() {
  await import('../../styles/screens/signup-id.scss');

  const signupId = new SignupId();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ signupId.screen.texts?.title }</h1>
        <p>${ signupId.screen.texts?.description }</p>
      </div>

      <div class='input-container'>
        <label>Enter your email</label>
        <input type='text' id='email' value='' placeholder='Enter your email' />
        <label>Enter your username</label>
        <input type='text' id='username' value='' placeholder='Enter your username' />

        <div class='captcha-container hidden'>
          <img src='${ signupId.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <label> Already have an account ? </label>
          <a href='${ signupId.screen.loginLink }'>Sign In</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
    
      <div class='federated-login-container hidden' id='federatedLoginContainer'>
        <label>Continue with Federated login</label>
      </div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (signupId.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (signupId.transaction.hasErrors) {
    showErrors();
  }
  
  if (signupId.transaction.hasAlternateConnections) {
    showFederatedConnections()
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $username = ($prompt.querySelector('#username') as HTMLInputElement);
    const $email = ($prompt.querySelector('#email') as HTMLInputElement);
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    $continueButton.addEventListener('click', () => {
      const options = {
        email: $email.value,
        username: $username.value,
        captcha: ''
      }
  
      if (signupId.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      signupId.continueWithUsername(options);
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

    signupId.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }

  // Handle Federated login.
  function showFederatedConnections() {
    const $federatedLoginContainer = $prompt.querySelector('#federatedLoginContainer') as HTMLElement;
    $federatedLoginContainer.classList.remove('hidden');

    const $buttonListFragment = document.createDocumentFragment();
    signupId.transaction.alternateConnections?.forEach((connection) => {
      const $button = document.createElement('button');
      $button.textContent = `Continue with ${connection.name}`;
      $button.addEventListener('click', () => signupId.continueWithFederatedConnection({connection: connection.name}));
      $buttonListFragment.appendChild($button);
    });
    
    $federatedLoginContainer.appendChild($buttonListFragment);
  }
}

