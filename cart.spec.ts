import { test, expect } from '@playwright/test';

test.describe('AutomationExercise Cart Page - 11 Test Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/view_cart');
  });

  test('TC_01 - Verify homepage title and URL', async ({ page }) => {
    await expect(page).toHaveTitle('Automation Exercise - Checkout');
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
  });

  test('TC_02 - Verify main menu on top', async ({ page }) => {
    await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  });

  test('TC_03 - Verify Cart is empty message', async ({ page }) => {
    await expect(page.getByText('Cart is empty! Click here to')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
  });

  test('TC_04 - Verify add to cart and check if product is added to the cart', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await expect(page.locator('#cartModal')).toContainText('Added!');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();
  });

  test('TC_05 - Add product, fill the form, and verify details in the cart', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page.getByRole('textbox', { name: 'Your Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email Address', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Review Here!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill('John Peter');
    await page.getByRole('textbox', { name: 'Your Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(`test${Date.now()}@example.com`);
    await page.getByRole('textbox', { name: 'Email Address', exact: true }).press('Tab');
    await page.getByRole('textbox', { name: 'Add Review Here!' }).press('End');
    await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('Add review');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();
    await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();
  });

  test('TC_06 - Add product and verify if able to Proceed to Checkout', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill('Jonny');
    await page.getByRole('textbox', { name: 'Your Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(`test${Date.now()}@example.com`);
    await page.getByRole('textbox', { name: 'Email Address', exact: true }).press('Tab');
    await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('added');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thank you for your review.')).toBeVisible();
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue On Cart' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue On Cart' }).click();
  });

  test('TC_07 - Add a product and verify if Availability, Condition, and Brand are visible', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('div:nth-child(5) > .product-image-wrapper > .choose > .nav > li > a').click();
    await expect(page.getByRole('heading', { name: 'Sleeveless  Dress' })).toBeVisible();
    await expect(page.locator('section')).toContainText('Availability: In Stock');
    await expect(page.getByText('Condition: New')).toBeVisible();
    await expect(page.locator('section')).toContainText('Condition: New');
    await page.getByRole('insertion').locator('div').first().click();
    await expect(page.locator('section')).toContainText('Brand: Madame');
    await expect(page.getByRole('link', { name: 'Write Your Review' })).toBeVisible();
  });

  test('TC_08 - Add a product and verify Login/Signup page while doing checkout', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  });

  test('TC_09 - Verify signup field after checkout for new user', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('johncare');
    await page.getByRole('textbox', { name: 'Name' }).press('Tab');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(`test${Date.now()}@example.com`);
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await expect(page.getByText('Address Information')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('TC_10 - Able to navigate to Home and Products from Cart', async ({ page }) => {
    await page.getByRole('link', { name: ' Home' }).click();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page).toHaveURL('https://automationexercise.com');
    await page.goto('https://automationexercise.com/view_cart');
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveTitle('Automation Exercise - All Products');
    await expect(page).toHaveURL('https://automationexercise.com/products');
  });

  test('TC_11 - Navigate from Cart - Here link to products page', async ({ page }) => {
    await expect(page.getByText('Cart is empty! Click here to')).toBeVisible();
    await expect(page.getByRole('link', { name: 'here' })).toBeVisible();
    await page.getByRole('link', { name: 'here' }).click();
    await expect(page).toHaveTitle('Automation Exercise - All Products');
    await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await expect(page.getByText('Your product has been added')).toBeVisible();
  });
});
