import {test , expect } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';


// Test suite for navigation tests ***

let storeHomePage: StoreHomePage;

test.beforeEach(async ({ page }) => {
  storeHomePage = new StoreHomePage(page);
  await storeHomePage.getToStore();
});


test('Verify navigation to store Home Page', async ({ page }) => {
    await storeHomePage.navigateToHome();                   // Already on store page from beforeEach
});


test('Verify navigation to Inventory Page', async ({ page }) => {
    await storeHomePage.navigateToInventory();
});


test('Verify navigation to Catalog Page', async ({ page }) => {
    await storeHomePage.navigateToCatalog();
}); 


test('Verify navigation to Cart Page', async ({ page }) => {
    await storeHomePage.navigateToCart();
});


test('Verify navigation to Payments Page', async ({ page }) => {
    await storeHomePage.navigateToPayments();
});


test('Verify navigation to Orders Page', async ({ page }) => {
    await storeHomePage.navigateToOrders();
});
