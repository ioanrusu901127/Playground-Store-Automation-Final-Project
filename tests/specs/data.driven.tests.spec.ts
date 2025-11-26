import { test } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';
import { StoreInventoryPage } from '../pages/storeInventory';
import { StoreCatalogPage } from '../pages/storeCatalog';
import { newStockOfItems } from '../data/new.stock.of.items';
import { existingStockOfItems } from '../data/existing.stock.of.items';




// Test suite for checking the existing inventory items

for (const item of existingStockOfItems) {

  test(`Verify existance in Catalog of: ${item.name}`, async ({ page }) => {

    const storeCatalogPage = new StoreCatalogPage(page);
    const storeHomePage = new StoreHomePage(page);

    await test.step('Navigate to Catalog Page', async () => {
      await storeHomePage.getToStore();
      await storeHomePage.navigateToCatalog();
    });
    
    await test.step(`Verify item: ${item.name}`, async () => {
      await storeCatalogPage.verifyItemName(item.itemId.toString(), item.name);
    });
    
    await test.step(`Verify price and quantity for item: ${item.name}`, async () => {
      await storeCatalogPage.verifyItemPrice(item.itemId.toString(), item.price);
    });
    
    await test.step(`Verify quantity for item: ${item.name}`, async () => {
      await storeCatalogPage.verifyItemQuantity(item.itemId.toString(), item.quantity);
    });
    
    await test.step(`Check add to cart button or out of stock for item`, async () => {
      if (item.quantity > 0) {
        await storeCatalogPage.checkAddItemToCart(item.itemId.toString());
      } else {
        await storeCatalogPage.checkOutOfStock(item.itemId.toString());
      }
    });
  });
}
    
    


// Test suite for data driven tests adding new stock items

for (const item of newStockOfItems) {

  test(`Add ${item.productName}`, async ({ page }) => {
    const storeInventoryPage = new StoreInventoryPage(page);
    const storeCatalogPage = new StoreCatalogPage(page);
    const storeHomePage = new StoreHomePage(page);
    const newItemIds = [8, 9, 10, 11, 12];

    await test.step('Navigate to Inventory Page', async () => {
      await storeHomePage.getToStore();
      await storeHomePage.navigateToInventory();
    });

    await test.step(`Add new item: ${item.productName}`, async () => {
      await storeInventoryPage.addNewInventoryItem(item.productName, item.price, item.quantity);
    });

    await test.step(`Verify new item: ${item.productName} appears in Inventory`, async () => {
      await storeInventoryPage.checkInventoryItemName(newItemIds[0]!.toString(), item.productName);
      await storeInventoryPage.checkInventoryItemStock(newItemIds[0]!.toString(), item.quantity);
      await storeInventoryPage.checkInventoryItemPrice(newItemIds[0]!.toString(), item.price);
    });

    await test.step('Navigate to Catalog Page to verify new item', async () => {
      await storeCatalogPage.navigateToCatalog();
    });

    await test.step(`Verify new item: ${item.productName} appears in Catalog`, async () => {
      await storeCatalogPage.verifyItemName(newItemIds[0]!.toString(), item.productName);
      await storeCatalogPage.verifyItemPrice(newItemIds[0]!.toString(), item.price);
      await storeCatalogPage.verifyItemQuantity(newItemIds[0]!.toString(), item.quantity);
      if (item.quantity > 0) {
        await storeCatalogPage.checkAddItemToCart(newItemIds[0]!.toString());
      } else {
        await storeCatalogPage.checkOutOfStock(newItemIds[0]!.toString());
      }
    });
  });
}
