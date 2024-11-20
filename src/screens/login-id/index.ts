import LoginId from 'ul-javascript/login-id';
 
export async function render() {
  await import('../../styles/screens/login-id.scss');

  const loginId = new LoginId();
  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1>${ loginId.screen.texts?.title }</h1>
        <p>${ loginId.screen.texts?.description }</p>
      </div>

      <div class='input-container'>
        <button class='pick-country-code hidden' id='pick-country-code'>Pick country code - ${ loginId.transaction.countryCode }: +${ loginId.transaction.countryPrefix } > </button>
        <label>Enter your email</label>
        <input type='text' id='username' value='' placeholder='Enter your email' />

        <div class='captcha-container hidden'>
          <img src='${ loginId.screen.captchaImage }' />
          <label>Enter the captcha</label>
          <input type='text' id='captcha' placeholder='Enter the captcha' value='' />
        </div>
  
        <div class='button-container'>
          <button id='continue'>Continue</button>
        </div>

        <div class='links-container'>
          <a href='${ loginId.screen.signupLink }'>Sign Up</a>
          <a href='${ loginId.screen.passwordResetLink }'>Reset Password</a>
        </div>
      </div>

      <div class='error-container hidden'></div>
      
      <div class='passkey-container hidden'>
        <label> Continue with Passkey</label>
        <button>Continue with passkey</button>
      </div>
    
      <div class='federated-login-container hidden' id='federatedLoginContainer'>
        <label>Continue with Federated login</label>
      </div>
    <div>
  `;
  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  showPromptInput();

  if (loginId.screen.hasCaptcha) {
    showCaptcha();
  }
  
  if (loginId.transaction.hasErrors) {
    showErrors();
  }

  if (loginId.screen.passkey) {
    showPasskeys();
  }
  
  if (loginId.transaction.hasAlternateConnections) {
    showFederatedConnections()
  }

  document.body.appendChild($prompt);

  // Handle Username/Email login.
  function showPromptInput() {
    // const $pickCountryCode = $prompt.querySelector('#pick-country-code') as HTMLButtonElement;
    // $pickCountryCode.classList.remove('hidden');
    // $pickCountryCode.addEventListener('click', () => loginId.continueWithCountryCode({}));
    const $continueButton = $prompt.querySelector('#continue') as HTMLButtonElement;
    const $username = ($prompt.querySelector('#username') as HTMLInputElement);
    const $captcha = ($prompt.querySelector('#captcha') as HTMLInputElement);
    $continueButton.addEventListener('click', () => {
      const options = {
        username: $username.value,
        captcha: ''
      }
  
      if (loginId.screen.hasCaptcha) {
        options.captcha = $captcha.value;
      }
  
      loginId.continueWithUsername(options);
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

    loginId.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }

  // Handle Passkey login.
  function showPasskeys() {
    const $passkeyContainer = $prompt.querySelector('.passkey-container') as HTMLElement;
    $passkeyContainer.classList.remove('hidden');

    const $passkeyButton = $passkeyContainer.querySelector('button') as HTMLButtonElement;
    $passkeyButton.addEventListener('click', () => loginId.continueWithPasskey({})); // TODO: Fix the param interface in the SDK
  }

  // Handle Federated login.
  function showFederatedConnections() {
    const $federatedLoginContainer = $prompt.querySelector('#federatedLoginContainer') as HTMLElement;
    $federatedLoginContainer.classList.remove('hidden');

    const $buttonListFragment = document.createDocumentFragment();
    loginId.transaction.alternateConnections?.forEach((connection) => {
      const $button = document.createElement('button');
      $button.textContent = `Continue with ${connection.name}`;
      $button.addEventListener('click', () => loginId.continueWithFederatedLogin({connection: connection.name}));
      $buttonListFragment.appendChild($button);
    });
    
    $federatedLoginContainer.appendChild($buttonListFragment);
  }
}

