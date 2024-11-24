import PasskeyEnrollment from 'ul-javascript/passkey-enrollment';
 
export async function render() {
  await import('../../styles/screens/passkey-enrollment.scss');

  const passkeyEnrollment = new PasskeyEnrollment();

  const promptTemplate = `
    <div class='prompt-container'>
      <div class='logo-container'>
        <img src='http://127.0.0.1:8080/auth0.png' />
      </div>

      <div class='title-container'>
        <h1 id='pageTitle'>${ passkeyEnrollment.screen.getScreenTexts()?.title }</h1>
        <p id='description'>${ passkeyEnrollment.screen.getScreenTexts()?.description }</p>
      </div>

      <div class='benefits-container'>
        <div class='section'>
          <h3>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit1Title }</h3>
          <p>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit1Description }</p>
        </div>

        <div class='section'>
          <h3>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit2Title }</h3>
          <p>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit2Description }</p>
        </div>

        <div class='section'>
          <h3>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit3Title }</h3>
          <p>${ passkeyEnrollment.screen.getScreenTexts()?.passkeyBenefit3Description }</p>
        </div>        
      </div>

      <div class='error-container'></div>
      
      <div class='passkey-container'>
        <button id='continue'>Create a passkey</button>
        <button id='abort'>Continue without passkey</button>
      </div>

      <div class='links-container'>
        <a href='${ passkeyEnrollment.screen.backLink }'>Go back</a>
      </div>
    <div>
  `;
  /*
passkeyBenefit1Description
: 
"With passkeys, you can use things like your fingerprint or face to login."
passkeyBenefit1ImgAltText
: 
"Webauthn platform icon"
passkeyBenefit1Title
: 
"No need to remember a password"
passkeyBenefit2Description
: 
"Passkeys will automatically be available across your synced devices."
passkeyBenefit2ImgAltText
: 
"Device globe"
passkeyBenefit2Title
: 
"Works on all of your devices"
passkeyBenefit3Description
: 
"Passkeys offer state-of-the-art phishing resistance."
passkeyBenefit3ImgAltText
: 
"Shield with check mark"
passkeyBenefit3Title
: 
"Keep your account safer"

based on the key values create title and description elements
  */


  const $prompt = new DOMParser().parseFromString(promptTemplate, 'text/html').body.firstChild as HTMLElement;

  // Show errors
  const $errorContainer = $prompt.querySelector('.error-container') as HTMLElement;
  if(passkeyEnrollment.transaction.hasErrors) {
    passkeyEnrollment.transaction.errors.forEach((error) => {
      const $error = document.createElement('p');
      $error.textContent = error.message;
      $errorContainer.appendChild($error);
    });
  }
  
  // Handle Passkey enrollment
  const $passkeyButton = $prompt.querySelector('#continue') as HTMLButtonElement;
  const $abortButton = $prompt.querySelector('#abort') as HTMLButtonElement;
  $passkeyButton.addEventListener('click', () => passkeyEnrollment.continueWithPasskeyEnrollment({})); // TODO: Fix the param interface in the SDK
  $abortButton.addEventListener('click', () => passkeyEnrollment.abortPasskeyEnrollment({})); // TODO: Fix the param interface

  document.body.appendChild($prompt);
}

