import { test, expect } from '@playwright/test';

test.describe('AutomationExercise Login Page - 12 Test Cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/login');
    });

    test('TC_01 - Verify page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
        await expect(page).toHaveURL('https://automationexercise.com/login');
    });

    test('TC_02 - Verify login form is visible', async ({ page }) => {
        await expect(page.locator('.login-form')).toBeVisible();
        await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
        await expect(page.locator('input[data-qa="login-password"]')).toBeVisible();
    });

    test('TC_03 - Verify signup form is visible', async ({ page }) => {
        await expect(page.locator('.signup-form')).toBeVisible();
        await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible();
        await expect(page.locator('input[data-qa="signup-email"]')).toBeVisible();
    });

    test('TC_04 - Verify error message with invalid credentials', async ({ page }) => {
        await page.fill('input[data-qa="login-email"]', 'invalid@example.com');
        await page.fill('input[data-qa="login-password"]', 'wrongpassword');
        await page.click('button[data-qa="login-button"]');
        await expect(page.locator('.login-form p')).toHaveText('Your email or password is incorrect!');
    });

    test('TC_05 - Verify empty login shows validation errors', async ({ page }) => {
        await page.click('button[data-qa="login-button"]');
        await expect(page.locator('input[data-qa="login-email"]:invalid')).toBeTruthy();
        await expect(page.locator('input[data-qa="login-password"]:invalid')).toBeTruthy();
    });

    test('TC_06 - New user signup form accepts input', async ({ page }) => {
        await page.fill('input[data-qa="signup-name"]', 'Test User');
        await page.fill('input[data-qa="signup-email"]', `test${Date.now()}@example.com`);
        await expect(page.locator('button[data-qa="signup-button"]')).toBeEnabled();
    });

    test('TC_07 - Capture login page screenshot', async ({ page }) => {
        await page.screenshot({ path: `screenshots/login-page${Date.now()}.png`, fullPage: true });
    });

    test('TC_08 - Check if able to navigate to Home and Cart pages', async ({ page }) => {
        await page.getByRole('link', { name: ' Home' }).click();
        await expect(page).toHaveTitle('Automation Exercise');
        await expect(page).toHaveURL('https://automationexercise.com');
        await page.goto('https://automationexercise.com/login');
        await page.getByRole('link', { name: ' Products' }).click();
        await expect(page).toHaveTitle('Automation Exercise - All Products');
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await page.goto('https://automationexercise.com/login');
        await page.getByRole('link', { name: ' Cart' }).click();
        await expect(page).toHaveTitle('Automation Exercise - Checkout');
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    });

    test('TC_09 - Able to signup as a new user', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(`test${Date.now()}`);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(`test${Date.now()}@example.com`);
        await page.getByRole('button', { name: 'Signup' }).click();
        await expect(page.getByText('Enter Account Information')).toBeVisible();
        await expect(page.getByText('Address Information')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
    });

    test('TC_10 - Verify successful login', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('john6@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Delete Account' })).toBeVisible();
        await page.getByRole('link', { name: ' Logout' }).click();
        await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
    });
    
    test('TC_11 - Create a new user and verify if user able to add a product to cart', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Name' }).fill(`test_user${Date.now()}`);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(`test_user${Date.now()}@example.com`);
        await page.getByRole('button', { name: 'Signup' }).click();
        await page.getByRole('textbox', { name: 'Password *' }).fill('pass123');
        await page.locator('#days').selectOption('1');
        await page.locator('#months').selectOption('1');
        await page.locator('#years').selectOption('2000');
        await page.getByRole('textbox', { name: 'First name *' }).fill(`user${Date.now()}`);
        await page.getByRole('textbox', { name: 'Last name *' }).fill('C');
        await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('450');
        await page.getByRole('textbox', { name: 'Address 2' }).fill('Street');
        await page.locator('div').filter({ hasText: 'Enter Account Information' }).nth(1).click();
        await page.getByRole('textbox', { name: 'State *' }).fill('KA');
        await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Mysore');
        await page.locator('#zipcode').fill('457858');
        await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('5874685475');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Account Created!')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
        await page.getByRole('link', { name: ' Products' }).click();
        await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.getByText('Your product has been added')).toBeVisible();
    });

    test('TC_12 - Verify if able to navigate to Home and Products pages', async ({ page }) => {
        await page.getByRole('link', { name: ' Home' }).click();
        await expect(page).toHaveTitle('Automation Exercise');
        await page.getByRole('link', { name: ' Products' }).click();
        await expect(page).toHaveTitle('Automation Exercise - All Products');
        await page.goto('https://automationexercise.com/login');
      });


});