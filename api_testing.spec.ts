import { test, expect } from '@playwright/test';

test.describe('AutomationExercise API Testing - 6 Test Cases', () => {
    test('TC_01 - GET all products list => Verify status code to be 200', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList');
        const responseBody = await JSON.parse(await response.text());
        //console.log(responseBody);
        expect(response.status()).toBe(200);
    });

    test('TC_02 - GET All brands list => Verify status code to be 200', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/brandsList');
        const responseBody = await JSON.parse(await response.text());
        expect(response.status()).toBe(200);
    });
    
    test('TC_03 - POST request - search a product => Verify status code to be 200', async ({ request }) => {
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            data: {
                "name": "Blue Top"
            }
        });
        const responseBody = await JSON.parse(await response.text());
        expect(response.status()).toBe(200);
    });

    test('TC_04 - POST request - login with valid details => Verify status code to be 200', async ({ request }) => {
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            data: {
                "email": "john6@example.com",
                "password": "pass123"
            }
        });
        const responseBody = await JSON.parse(await response.text());
        expect(response.status()).toBe(200);
    });

    test('TC_05 - POST request - Create an account => Verify status code to be 201', async ({ request }) => {
        const response = await request.post('https://automationexercise.com/api/createAccount', {
            data: {
                "name": "Abbas",
                "email": `test${Date.now()}@example.com`,
                "password": "pass123",
                "title": "Mr",
                "birth_date": "10",
                "birth_month": "5", 
                "birth_year": "2000",
                "firstname": "Yusuf",
                "lastname": "Abbas",
                "company": "UST",
                "address1": "419",
                "address2": "Rajivnagar",
                "country": "India",
                "zipcode": "458768",
                "state": "KA",
                "city": "Mysore",
                "mobile_number": "4586878545"
            }
        });
        const responseBody = await JSON.parse(await response.text());
        expect(response.status()).toBe(200);
    });
    
    test('TC_06 - DELETE request - Delete an account => Verify status code to be 200', async ({ request }) => {
        const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
            data: {
                "email": `abbas@example.com`,
                "password": "pass123",
            }
        });
        const responseBody = await JSON.parse(await response.text());
        expect(response.status()).toBe(200);
    });
  
});