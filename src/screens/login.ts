import  { Login } from 'ul-javascript/login';
import { createFormContainer } from './common';

const { screen, submitForm } = new Login();

const formString = `
  <label for="username">Username</label>
  <input type="text" id="username" name="username">
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <button type="submit">Sign In</button>
`;

export function login() {
  const $app = createFormContainer('login', formString, screen.texts?.description, submitForm);
  document.body.appendChild($app);
}