import { test } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';
import { StoreInventoryPage } from '../pages/storeInventory';
import { StoreCatalogPage } from '../pages/storeCatalog';
import { StoreCartPage } from '../pages/storeCart';
import { StorePaymentsPage } from '../pages/storePayments';
import { newStockOfItems } from '../data/new.stock.of.items';
import { idItemInCart } from '../data/store.pages.data';
import { existingStockOfItems } from '../data/existing.stock.of.items';




// End of test suites

 for (const item of newStockOfItems) {

  test(`Add ${item.productName} to inventory`, async ({ page }) => {
    const storeInventoryPage = new StoreInventoryPage(page);
    const storeCatalogPage = new StoreCatalogPage(page);
    const storeHomePage = new StoreHomePage(page);
    const storeCartPage = new StoreCartPage(page);
    const storePaymentsPage = new StorePaymentsPage(page);
    const newItemIds = [8, 9, 10, 11, 12];

    await test.step('Navigate to Inventory', async () => {
      await storeHomePage.navigateToInventory();
    });

    await test.step(`Add item: ${item.productName}`, async () => {
      await storeInventoryPage.addNewInventoryItem(item.productName, item.price, item.quantity);
    });

    await test.step(`Verify item: ${item.productName} appears in Inventory`, async () => {
      await storeInventoryPage.checkInventoryItemName(newItemIds[0]!.toString(), item.productName);
      await storeInventoryPage.checkInventoryItemStock(newItemIds[0]!.toString(), item.quantity);
      await storeInventoryPage.checkInventoryItemPrice(newItemIds[0]!.toString(), item.price);
    });

    await test.step('Navigate to Catalog', async () => {
      await storeCatalogPage.navigateToCatalog();
    });

    await test.step(`Verify item: ${item.productName} appears in Catalog`, async () => {
      await storeCatalogPage.verifyItemName(newItemIds[0]!.toString(), item.productName);
      await storeCatalogPage.verifyItemPrice(newItemIds[0]!.toString(), item.price);
      await storeCatalogPage.verifyItemQuantity(newItemIds[0]!.toString(), item.quantity);
      await storeCatalogPage.checkAddItemToCart(newItemIds[0]!.toString());
    });

    await test.step(`Add to cart 2x ${item.productName}`, async () => {
        await storeCatalogPage.addItemToCart(newItemIds[0]!.toString(), item.quantity);
        await storeCatalogPage.addItemToCart(newItemIds[0]!.toString(), item.quantity - 1);
    });

    await test.step(`Navigate to Cart`, async () => {
        await storeCatalogPage.navigateToCart();
    });

    await test.step(`Verify item ${item.productName} in Cart`, async () => {
    
        await storeCartPage.verifyCartItemDetails(idItemInCart[0]!.toString(), item.price, 2, item.price * 2, item.productName);
        
    });
    
    await test.step(`Verify total price in Cart for item ${item.productName}`, async () => {
        await storeCartPage.verifyTotalCartPrice(item.price * 2);
    });

    await test.step('Navigate to Payments', async () => {
        await storeCartPage.navigateToPayments();
    });

    await test.step(`Verify item ${item.productName} in Payments`, async () => {
        await storePaymentsPage.verifyItemDetails(item.productName, item.price, 2, item.price * 2, idItemInCart[0]!.toString());
    });

  });
}