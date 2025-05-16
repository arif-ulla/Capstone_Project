import { test, expect } from '@playwright/test';

test.describe('AutomationExercise Contact Us Page - 10 Test Cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/contact_us');
    });

    test('TC_01 - Page should load with correct title', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - Contact Us');
        await expect(page).toHaveURL('https://automationexercise.com/contact_us');
    });

    test('TC_02 - All form fields should be visible', async ({ page }) => {
        await expect(page.locator('input[data-qa="name"]')).toBeVisible();
        await expect(page.locator('input[data-qa="email"]')).toBeVisible();
        await expect(page.locator('input[data-qa="subject"]')).toBeVisible();
        await expect(page.locator('textarea[data-qa="message"]')).toBeVisible();
    });

    test('TC_03 - Show error when submitting empty form', async ({ page }) => {
        await page.click('input[data-qa="submit-button"]');
        page.once('dialog', dialog => dialog.accept());
        await expect(page.locator('.status.alert.alert-success')).not.toBeVisible();
    });

    test('TC_04 - Verify navigation link "Home" works correctly', async ({ page }) => {
        await page.click('a:has-text("Home")');
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    test('TC_05 - Take screenshot of contact form', async ({ page }) => {
        await page.screenshot({ path: `screenshots/contact-page${Date.now}.png`, fullPage: true });
    });

    test('TC_06 - Verify Feedback and feedback link are present', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Feedback For Us' })).toBeVisible();
        await expect(page.locator('address')).toContainText('We really appreciate your response to our website.');
        await expect(page.getByRole('link', { name: 'feedback@automationexercise.' })).toBeVisible();
    });

    test('TC_07 - Verify all fields are present', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Subject' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Your Message Here' })).toBeVisible();
    });

    test('TC_08 - Verify navigation to different pages', async ({ page }) => {
        await page.getByRole('link', { name: ' Home' }).click();
        await expect(page).toHaveTitle('Automation Exercise');
        await expect(page).toHaveURL('https://automationexercise.com/');
        await page.goto('https://automationexercise.com/contact_us');
        await page.getByRole('link', { name: ' Products' }).click();
        await expect(page).toHaveTitle('Automation Exercise - All Products');
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await page.goto('https://automationexercise.com/contact_us');
        await page.getByRole('link', { name: ' Cart' }).click();
        await expect(page).toHaveTitle('Automation Exercise - Checkout');
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    });

    test('TC_09 - Verify Subscription field is present', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Choose File' })).toBeVisible();
        await expect(page.locator('#footer')).toContainText('Subscription');
        await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
        await expect(page.locator('#footer')).toContainText('Get the most recent updates from our site and be updated your self...');
    });

    test('TC_10 - Verify footer', async ({ page }) => {
        await expect(page.locator('#footer')).toContainText('Copyright © 2021 All rights reserved');
    });

});
