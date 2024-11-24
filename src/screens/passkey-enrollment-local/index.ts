import PasskeyEnrollmentLocal from 'ul-javascript/passkey-enrollment-local';
 
export async function render() {
  await import('../../styles/screens/passkey-enrollment.scss');

  const passkeyEnrollmentLocal = new PasskeyEnrollmentLocal();

  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1 id='pageTitle'>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.title }</h1>
        <p id='description'>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.description }</p>
      </div>

      <div class='benefits-container'>
        <div class='section'>
          <h3>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.passkeyBenefit1Title }</h3>
          <p>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.passkeyBenefit1Description }</p>
        </div>

        <div class='section'>
          <h3>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.passkeyBenefit2Title }</h3>
          <p>${ passkeyEnrollmentLocal.screen.getScreenTexts()?.passkeyBenefit2Description }</p>
        </div>        
      </div>

      <div class='error-container'></div>
      
      <div class='passkey-container'>
        <button id='continue'>Create a passkey</button>
        <button id='abort'>Continue without passkey</button>
      </div>

      <div class='links-container'>
        <label><input type='checkbox' id='doNotShowAgain' /> Do not show again </label>
      </div

      <div class='links-container'>
        <a href='${ passkeyEnrollmentLocal.screen.backLink }'>Go back</a>
      </div>
    <div>
  `;

  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  // Show errors
  const $errorContainer = $prompt.querySelector('.error-container') as HTMLElement;
  if(passkeyEnrollmentLocal.transaction.hasErrors) {
    passkeyEnrollmentLocal.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
  
  // Handle Passkey enrollment
  const $passkeyButton = $prompt.querySelector('#continue') as HTMLButtonElement;
  const $abortButton = $prompt.querySelector('#abort') as HTMLButtonElement;
  const $doNotShowAgain = $prompt.querySelector('#doNotShowAgain') as HTMLInputElement;

  
  $passkeyButton.addEventListener('click', () => passkeyEnrollmentLocal.continueWithPasskeyEnrollmentLocal({})); // TODO: Fix the param interface in the SDK
  $abortButton.addEventListener('click', () => {
    const options: { [key: string]: boolean } = {};
    if ($doNotShowAgain.checked) {
      options['doNotShowAgain'] = true;
    }
    passkeyEnrollmentLocal.abortPasskeyEnrollmentLocal(options)
  }); // TODO: Fix the param interface

  document.body.appendChild($prompt);
}

