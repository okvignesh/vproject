describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});

import {device, element, by, expect} from 'detox';

describe('Signup', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to signup screen', async () => {
    await element(by.id('signup_button')).tap();
    await expect(element(by.id('signup_title'))).toBeVisible();
  });

  it('should show error with invalid credentials', async () => {
    // Tap on the signup button without entering any details
    await element(by.id('signup_button')).tap();
    await element(by.id('signup_submit_button')).tap();

    // Check if error messages are displayed
    await expect(element(by.text('Name is required'))).toBeVisible();
    await expect(element(by.text('Email is required'))).toBeVisible();
    await expect(element(by.text('Password is required'))).toBeVisible();
  });

  // it('should show error with invalid email', async () => {
  //   // Enter invalid email format
  //   await element(by.id('signup_username_input')).typeText('Vignesh K');
  //   await element(by.id('signup_email_input')).typeText('invalidemail');
  //   await element(by.id('signup_password_input')).typeText('vignesh');
  //   await element(by.id('signup_submit_button')).tap();

  //   // Check if error message for invalid email is displayed
  //   await expect(element(by.text('Invalid email'))).toBeVisible();
  // });

  // it('should signup with valid credentials', async () => {
  //   // Enter valid signup details
  //   await element(by.id('signup_username_input')).typeText('Vignesh K');
  //   await element(by.id('signup_email_input')).typeText(
  //     'vignesh21@vignesh.com',
  //   );
  //   await element(by.id('signup_password_input')).typeText('vignesh');
  //   await element(by.id('signup_submit_button')).tap();

  //   // Check if the signup was successful
  //   // await expect(
  //   //   element(by.text('Signup Successful, Login Now')),
  //   // ).toBeVisible();
  //   await expect(element(by.text('profileScreen'))).toBeVisible();
  // });

  it('should navigate to login screen', async () => {
    await element(by.id('goto_login')).tap();
    await expect(element(by.text('Login'))).toBeVisible();
  });
});

describe('Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should display login screen', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
  });

  it('should show error for invalid email', async () => {
    await element(by.id('email_input')).typeText('invalidemail');
    await element(by.id('password_input')).typeText('validpassword');
    await element(by.id('login_button')).tap();
    await expect(element(by.text('Invalid email'))).toBeVisible();
  });

  it('should show error for empty email and password', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('Email is required'))).toBeVisible();
    await expect(element(by.text('Password is required'))).toBeVisible();
  });

  // it('should login with valid credentials', async () => {
  //   // Replace these with valid email and password
  //   const validEmail = 'vignesh3@vignesh.com';
  //   const validPassword = 'vignesh';

  //   await element(by.id('email_input')).typeText(validEmail);
  //   await element(by.id('password_input')).typeText(validPassword);
  //   await element(by.id('login_button')).tap();

  //   // Add assertions for the next screen or action after successful login
  //   await expect(element(by.text('profileScreen'))).toBeVisible();
  // });

  it('should navigate to signup screen', async () => {
    await element(by.id('signup_button')).tap();
    await expect(element(by.text('Sign Up'))).toBeVisible();
  });
});
