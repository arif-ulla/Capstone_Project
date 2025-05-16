import { test, expect } from '@playwright/test'

test.describe('AutomationExercise Products Page - 15 Test Cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/products');
    });

    test('TC_01 - Verify products page title', async ({ page }) => {
        await expect(page).toHaveTitle(/All Products/);
    });

    test('TC_02 - Test product search', async ({ page }) => {
        await page.fill('#search_product', 'Jeans');
        await page.click('#submit_search');
        await expect(page.locator('.features_items')).toContainText('Jeans');
    });

    test('TC_03 - Test add to cart from products page', async ({ page }) => {
        await page.hover('.product-image-wrapper');
        await page.click('.add-to-cart');
        await expect(page.locator('.modal-content')).toBeVisible();
    });

    test('TC_04 - Verify category filter', async ({ page }) => {
        await page.click('a[href="#Women"]');
        await page.click('a[href="/category_products/1"]');
        await expect(page).toHaveURL(/category_products/);
    });

    test('TC_05 - Test brand filter', async ({ page }) => {
        await page.click('a[href="/brand_products/Polo"]');
        await expect(page.locator('.features_items')).toContainText('Polo');
    });

    test('TC_06 - Test write review functionality', async ({ page }) => {
        await page.click('.choose a');
        await page.click('a[href="#reviews"]');
        await expect(page.locator('#review-form')).toBeVisible();
    });

    test('TC_07 - Take products page screenshot', async ({ page }) => {
        await page.screenshot({ path: `screenshots/products${Date.now()}.png` });
    });

    test('TC_08 - Check if able to navigate to Home and Cart pages', async ({ page }) => {
        await page.getByRole('link', { name: ' Home' }).click();
        await expect(page).toHaveTitle('Automation Exercise');
        await expect(page).toHaveURL('https://automationexercise.com');
        await page.goto('https://automationexercise.com/products');
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Search Product' })).toBeVisible();
        await page.getByRole('link', { name: ' Cart' }).click();
        await expect(page).toHaveTitle('Automation Exercise - Checkout');
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    });

    test('TC_09 - Add a product and see if able to navigate to product details page', async ({ page }) => {
        await page.locator('.choose > .nav > li > a').first().click();
        await expect(page.getByRole('button', { name: ' Add to cart' })).toBeVisible();
        await expect(page.locator('section')).toContainText('Availability: In Stock');
        await expect(page.locator('section')).toContainText('Condition: New');
        await expect(page.locator('section')).toContainText('Brand: Polo');
        await expect(page.locator('section')).toContainText('Blue Top');
        await expect(page.getByRole('link', { name: 'Write Your Review' })).toBeVisible();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
        await expect(page.getByRole('link', { name: 'View Cart' })).toBeVisible();
        await page.getByRole('link', { name: 'View Cart' }).click();
        await expect(page.getByText('Proceed To Checkout')).toBeVisible();
    });

    test('TC_10 - Add a product and see if it navigates to signup page for new user', async ({ page }) => {
        await page.locator('div:nth-child(5) > .product-image-wrapper > .choose > .nav > li > a').click();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
        await page.getByRole('link', { name: 'View Cart' }).click();
        await expect(page.getByText('Proceed To Checkout')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
        await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
        await page.getByRole('link', { name: 'Register / Login' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    });

    test('TC_11 - Navigate to Kookie Kids and add a product', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(3) Kookie Kids' })).toBeVisible();
        await page.getByRole('link', { name: '(3) Kookie Kids' }).click();
        await expect(page).toHaveTitle('Automation Exercise - Kookie Kids Products');
        await expect(page.getByRole('heading', { name: 'Brand - Kookie Kids Products' })).toBeVisible();
        await page.getByRole('link', { name: ' View Product' }).first().click();
        await expect(page.getByText('Availability: In Stock')).toBeVisible();
        await expect(page.getByText('Condition: New')).toBeVisible();
        await expect(page.getByText('Brand: Kookie Kids')).toBeVisible();
        await expect(page.getByRole('button', { name: ' Add to cart' })).toBeVisible();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    });

    test('TC_12 - Verify all categories and brands are displayed', async ({ page }) => {
        await expect(page.getByRole('link', { name: ' Women' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Men' })).toBeVisible();
        await expect(page.getByRole('link', { name: ' Kids' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(6) Polo' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(5) H&M' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(5) Madame' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(3) Mast & Harbour' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(4) Babyhug' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(3) Allen Solly Junior' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(3) Kookie Kids' })).toBeVisible();
        await expect(page.getByRole('link', { name: '(5) Biba' })).toBeVisible();
    });

    test('TC_13 - Add an H&M product and verify if able to checkout', async ({ page }) => {
        await page.getByRole('link', { name: '(5) H&M' }).click();
        await expect(page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible();
        await page.getByRole('link', { name: ' View Product' }).nth(2).click();
        await page.goto('https://automationexercise.com/product_details/28');
        await expect(page.getByText('Availability: In Stock')).toBeVisible();
        await expect(page.getByText('Condition: New')).toBeVisible();
        await expect(page.getByText('Brand: H&M')).toBeVisible();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
    });

    test('TC_14 - Add a Biba product, check if navigating to proper page, and verify checkout', async ({ page }) => {
        await expect(page.getByRole('link', { name: '(5) Biba' })).toBeVisible();
        await page.getByRole('link', { name: '(5) Biba' }).click();
        await expect(page).toHaveTitle('Automation Exercise - Biba Products');
        await expect(page.getByRole('heading', { name: 'Brand - Biba Products' })).toBeVisible();
        await page.getByRole('link', { name: ' View Product' }).nth(2).click();
        await expect(page.getByText('Brand: Biba')).toBeVisible();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.locator('#cartModal')).toContainText('Your product has been added to cart.');
        await page.getByRole('link', { name: 'View Cart' }).click();
        await expect(page.getByRole('link', { name: 'Sleeveless Unicorn Print Fit' })).toBeVisible();
        await expect(page.getByText('Proceed To Checkout')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
        await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    });

    test('TC_15 - Add a product to cart and verify if able to see the product from cart tab', async ({ page }) => {
        await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
        await page.getByRole('button', { name: ' Add to cart' }).click();
        await expect(page.getByText('Your product has been added')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
        await page.getByRole('link', { name: ' Cart' }).click();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        await expect(page.getByText('Proceed To Checkout')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
        await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    });
});