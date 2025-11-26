import {test , expect } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';


// Test suite for navigation tests ***


test('Verify navigation to store Home Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
});


test('Verify navigation to Inventory Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
    await storeHomePage.navigateToInventory();
});


test('Verify navigation to Catalog Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
    await storeHomePage.navigateToCatalog();
}); 


test('Verify navigation to Cart Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
    await storeHomePage.navigateToCart();
});


test('Verify navigation to Payments Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
    await storeHomePage.navigateToPayments();
});


test('Verify navigation to Orders Page', async ({ page }) => {
    const storeHomePage = new StoreHomePage(page);
    await storeHomePage.getToStore();
    await storeHomePage.navigateToOrders();
});
