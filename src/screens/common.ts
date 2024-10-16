export function addLogoText(logo: string) {
  const $logo = document.createElement('div');
  $logo.classList.add('ul-logo');
  $logo.textContent = logo;
  return $logo;
}

export function addDescription(description: string | undefined) {
  const $title = document.createElement('div');
  $title.classList.add('ul-description');
  $title.textContent = description || '';
  return $title;
}

export function createFormContainer(screenName: string, formString: string, description: string | undefined, submitHandler: EventListener) {
  const $app = document.createElement('div');
  const $formContainer = document.createElement('div');
  const $screenName = document.createElement('div');
  const $form = document.createElement('form');

  $app.id = 'app';
  $formContainer.classList.add('ul-form-container');
  $formContainer?.prepend(addLogoText('Atko'));
  $formContainer?.prepend(addDescription(description));

  $form.innerHTML = formString;
  $form.classList.add('login-form');
  $form.addEventListener('submit', submitHandler);
  
  $screenName.classList.add('ul-screen-name');
  $screenName.textContent = screenName;
  $screenName.addEventListener('click', () => {
    // @ts-ignore
    console.log(window.universal_login_context);
  });
  $app.appendChild($screenName);
  
  $formContainer.appendChild($form);
  $app.appendChild($formContainer);

  return $app;
}

export function createLinks(signupLink: string | undefined, passwordResetLink: string | undefined) {
  const $links = document.createElement('div');
  const $signUp = document.createElement('a');
  const $resetPassword = document.createElement('a');

  $links.classList.add('ul-links');
  if (signupLink) {
    $signUp.href = signupLink;
    $signUp.textContent = 'Sign Up';
    $signUp.classList.add('ul-sign-up', 'ul-link');
  }

  if (passwordResetLink) {
    $resetPassword.href = passwordResetLink;
    $resetPassword.textContent = 'Reset Password';
    $resetPassword.classList.add('ul-reset-password', 'ul-link');
  }

  $links.appendChild($signUp);
  $links.appendChild($resetPassword);

  return $links;
}

export const createErrors = (errors: any) => {
  const $errors = document.createElement('div');
  $errors.classList.add('ul-errors');
  if (!errors || errors.length === 0) return $errors;
  // @ts-ignore
  errors.forEach(error => {
    const $error = document.createElement('div');
    $error.classList.add('ul-error');

    $error.textContent = error.message || error.code;
    $errors.appendChild($error);
  });
  return $errors;
}

export const createConnections = (connections: any, submitHandler: EventListener) => {
  const $federatedFrom = document.createElement('form');
  const $connections = document.createElement('div');
  $connections.classList.add('ul-connections');
  if (!connections || connections.length === 0) return $connections;
  // @ts-ignore
  connections.forEach(connection => {
    if (!connection.displayName) return;

    const $connection = document.createElement('button');
    $connection.setAttribute('type', 'submit');
    $connection.setAttribute('name', 'connection');
    $connection.setAttribute('value', connection.name);
    $connection.classList.add('ul-connection');

    $connection.textContent = connection.displayName;
    $connections.appendChild($connection);
  });
  $federatedFrom.append($connections);
  $federatedFrom.addEventListener('submit', submitHandler);
  return $federatedFrom;
}

export const createSeparator = () => {
  const $separator = document.createElement('div');
  $separator.classList.add('ul-separator');
  return $separator;
}