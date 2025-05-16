import { test, expect } from '@playwright/test'

test.describe('AutomationExercise Home Page - 14 Test Cases', () => {
    async function addToCart(page, productId: number) {
        await page.goto(`https://automationexercise.com/product_details/${productId}`);
        await page.click('button:has-text("Add to cart")');
        await page.click('button:has-text("Continue Shopping")');
    }

    test('TC_01 - Verify homepage title and URL', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await expect(page).toHaveTitle('Automation Exercise');
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    test('TC_02 - Subscribe with valid email', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.fill('#susbscribe_email', 'test@examplen.com');
        await page.click('#subscribe');
        await expect(page.locator('.alert-success')).toContainText('You have been successfully subscribed!');
    });

    test('TC_03 - Add product to cart from homepage', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.hover('.product-image-wrapper');
        await page.click('a[data-product-id="1"]');
        await page.click('button:has-text("Continue Shopping")');
        await expect(page.locator('ul.navbar-nav:has-text("Cart")')).toBeVisible();
    });

    test('TC_04 - Verify product quantity in cart', async ({ page }) => {
        await addToCart(page, 1); // Helper function to add product
        await page.goto('https://automationexercise.com/view_cart');
        const quantity = await page.locator('.cart_quantity button').textContent();
        expect(quantity).toBe('1');
    });

    test('TC_05 - Remove product from cart', async ({ page }) => {
        await addToCart(page, 1);
        await page.goto('https://automationexercise.com/view_cart');
        await page.click('.cart_delete a');
        await expect(page.locator('span#empty_cart')).toContainText('Cart is empty!');
    });

    test('TC_06 - Navigate to Women > Dress category', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.click('a[href="#Women"]');
        await page.click('a[href="/category_products/1"]');
        await expect(page).toHaveURL(/category_products/);
    });

    test('TC_07 - Filter products by brand "Polo"', async ({ page }) => {
        await page.goto('https://automationexercise.com/products');
        await page.click('a[href="/brand_products/Polo"]');
        await expect(page.locator('.features_items')).toContainText('Polo');
    });

    test('TC_08 - View product details', async ({ page }) => {
        await page.goto('https://automationexercise.com/product_details/1');
        await expect(page.locator('.product-information h2')).toContainText('Blue Top');
        await expect(page.locator('.product-information span span')).toBeVisible(); // Price
    });

    test('TC_09 - Access test cases page', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.click('a[href="/test_cases"]');
        await expect(page.locator('h2.title.text-center')).toContainText('Test CasesSoftware testing services');
    });

    test('TC_10 - Scroll to subscription footer', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.locator('#footer')).toBeInViewport();
    });

    test('TC_11 - View recommended items', async ({ page }) => {
        await page.goto('https://automationexercise.com');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.locator('.recommended_items')).toBeVisible();
    });

    test('TC_12 - Verify Categories are visible', async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Women' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Men' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Kids' })).toBeVisible();
    })

    test('TC_13 - Verify main menu on top', async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Cart' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
        await page.getByRole('link', { name: ' Products' }).click();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await page.goto('https://automationexercise.com/');
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    });

    test('TC_14 - Verify Subscription field is visible', async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
        await expect(page.locator('form')).toContainText('Get the most recent updates from our site and be updated your self...');
        await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
    });
});