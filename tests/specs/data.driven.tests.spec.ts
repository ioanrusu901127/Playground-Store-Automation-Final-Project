import { test } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';
import { StoreInventoryPage } from '../pages/storeInventory';
import { StoreCatalogPage } from '../pages/storeCatalog';
import { newStockOfItems } from '../data/new.stock.of.items';
import { existingStockOfItems } from '../data/existing.stock.of.items';


// Canstants:
const NEW_ITEM_IDS = [8, 9, 10, 11, 12];

// Page objects used across tests 
let storeHomePage: StoreHomePage;
let storeInventoryPage: StoreInventoryPage;
let storeCatalogPage: StoreCatalogPage;

// Initialize page objects before each test
test.beforeEach(async ({ page }) => {
  storeHomePage = new StoreHomePage(page);
  storeInventoryPage = new StoreInventoryPage(page);
  storeCatalogPage = new StoreCatalogPage(page);
});



// Data driven tests for checking the EXISTING items //

for (const item of existingStockOfItems) {

  test(`Verify existance in Catalog of: ${item.name}`, async ({ page }) => {

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

    console.log (`${item.quantity}x ${item.name} are available in the catalog`);
  });
}
    
    

// Data driven tests adding a NEW item //

for (const item of newStockOfItems) {

  test(`Add ${item.productName}`, async ({ page }) => {

    let newItemIds = NEW_ITEM_IDS;

    // Navigate to Inventory Page, add and item and verify in inventory
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

    // Verify the newly added item in Catalog without refresing the webpage 
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

    console.log(`${item.productName} was added successfully`);
  });
}




// Test romoval of one copy of an item from the Inventory 

for (const item of existingStockOfItems) {
    
  test(`Remove one unit of ${item.name} from Inventory`, async ({ page }) => {

    await test.step('Navigate to Inventory Page', async () => { 
        await storeHomePage.getToStore();
    });

    await test.step(`Remove one unit of: ${item.name} from Inventory`, async () => {
        await storeHomePage.navigateToInventory();
        await storeInventoryPage.removeOneUnitFromInventoryItem(item.itemId.toString(), item.quantity);
    });

    await test.step(`Verify item: ${item.name} is updated in Catalog`, async () => {
        await storeHomePage.navigateToCatalog();
        await storeCatalogPage.verifyItemName(item.itemId.toString(), item.name);
        await storeCatalogPage.verifyItemPrice(item.itemId.toString(), item.price);
        await storeCatalogPage.verifyItemQuantity(item.itemId.toString(), item.quantity - 1);
        if (item.quantity - 1 > 0) {

            await storeCatalogPage.checkAddItemToCart(item.itemId.toString());
            console.log(`One unit of ${item.name} was removed from Inventory and there are ${item.quantity - 1} units left in Catalog`);

        } else {

            if (item.quantity > 0) {
            await storeCatalogPage.checkOutOfStock(item.itemId.toString());
            console.log(`One unit of ${item.name} was removed from Inventory and the item is now out of stock in Catalog`);
            }

        }
    });

    
    });
  }





// Test removing all copies of and item from Inventory and check if the Catalog is updated accordingly //

for (const item of existingStockOfItems) {
    
  test(`Remove all ${item.name} from Inventory`, async ({ page }) => {

    await test.step('Navigate to Inventory Page', async () => { 
        await storeHomePage.getToStore();
    });

    await test.step(`Remove all units of: ${item.name} from Inventory`, async () => {
        await storeHomePage.navigateToInventory();
        await storeInventoryPage.removeUnitsFromInventoryItem(item.itemId.toString(), item.quantity);
    });

    await test.step(`Verify item: ${item.name} is updated in Catalog`, async () => {
        await storeHomePage.navigateToCatalog();
        await storeCatalogPage.verifyItemName(item.itemId.toString(), item.name);
        await storeCatalogPage.verifyItemPrice(item.itemId.toString(), item.price);
        await storeCatalogPage.verifyItemQuantity(item.itemId.toString(), 0);
        await storeCatalogPage.checkOutOfStock(item.itemId.toString());
    });


  });

}


