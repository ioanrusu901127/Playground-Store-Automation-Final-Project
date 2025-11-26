import { test } from '@playwright/test';
import { StoreHomePage } from '../pages/storeHome';
import { StoreInventoryPage } from '../pages/storeInventory';
import { StoreCatalogPage } from '../pages/storeCatalog';
import { StoreCartPage } from '../pages/storeCart';
import { StorePaymentsPage } from '../pages/storePayments';
import { StoreOrdersPage } from '../pages/storeOrders';
import { newStockOfItems } from '../data/new.stock.of.items';
import { idItemInCart, paymentCards } from '../data/store.pages.data';
import { existingStockOfItems } from '../data/existing.stock.of.items';
import { it } from 'node:test';


// Constants
const NEW_ITEM_IDS = [8, 9, 10, 11, 12];
const PURCHASE_QUANTITY = 2;               // Can be changed as convenient for tests

// Page objects - shared across tests
let storeHomePage: StoreHomePage;
let storeInventoryPage: StoreInventoryPage;
let storeCatalogPage: StoreCatalogPage;
let storeCartPage: StoreCartPage;
let storePaymentsPage: StorePaymentsPage;
let storeOrdersPage: StoreOrdersPage;

// Initialize all page objects
test.beforeEach(async ({ page }) => {
  storeHomePage = new StoreHomePage(page);
  storeInventoryPage = new StoreInventoryPage(page);
  storeCatalogPage = new StoreCatalogPage(page);
  storeCartPage = new StoreCartPage(page);
  storePaymentsPage = new StorePaymentsPage(page);
  storeOrdersPage = new StoreOrdersPage(page);
});


// E2E TEST - Purchase a certain amount of an existing item //

for (const item of existingStockOfItems) {

  test(`Purchase ${PURCHASE_QUANTITY} ${item.name}`, async ({ page }) => {
   
    const itemId = item.itemId.toString();
    const totalPrice = item.price * PURCHASE_QUANTITY;
    const cartItemId = idItemInCart[0].toString();


    // Check the item in catalog and add it to cart
    await test.step('Navigate to Catalog', async () => {
        await storeHomePage.getToStore();
        await storeHomePage.navigateToCatalog();
    });

    await test.step(`Verify item: ${item.name} appears in Catalog`, async () => {
        await storeCatalogPage.verifyItemName(itemId, item.name);
        await storeCatalogPage.verifyItemPrice(itemId, item.price);
        await storeCatalogPage.verifyItemQuantity(itemId, item.quantity);
        if (item.quantity > 0) {                                               //Checking if there is stock or not
        await storeCatalogPage.checkAddItemToCart(itemId);
        }
         else {
        await storeCatalogPage.checkOutOfStock(itemId);
         }
    });


    // Add the specified quantity to cart if tere is stock

if (item.quantity >= PURCHASE_QUANTITY) {
    await test.step(`Add to cart ${PURCHASE_QUANTITY}x ${item.name}`, async () => {
        for (let i = 0; i < PURCHASE_QUANTITY; i++) {
            await storeCatalogPage.addItemToCart(itemId, item.quantity - i);
        }
    });


    // Verify the item in the cart as well as the total price and proceed to payment
    await test.step(`Navigate to Cart`, async () => {
        await storeCatalogPage.navigateToCart();
    });

    await test.step(`Verify item ${item.name} in Cart`, async () => {
        await storeCartPage.verifyCartItemDetails(cartItemId, item.price, PURCHASE_QUANTITY, item.price * PURCHASE_QUANTITY, item.name);
        await storeCartPage.verifyTotalCartPrice(totalPrice);
    });
    await test.step(`Navigate to Payments`, async () => {
        await storeCartPage.navigateToPayments();
    });


    // Verify the item on Payments page and confirm the payment
    await test.step(`Verify item ${item.name} in Payments`, async () => {
        await storePaymentsPage.verifyItemDetails(item.name, item.price, PURCHASE_QUANTITY, item.price * PURCHASE_QUANTITY, cartItemId);
        await storePaymentsPage.verifyTotalPaymentPrice(totalPrice);
    });

    await test.step('Confirm Payment', async () => {
        await storePaymentsPage.selectPaymentOption(paymentCards.payPal.displayName);
        await storePaymentsPage.confirmPayment();
    });


    // Verify the order completion on Orders page
    
    // The navigation to Orders is done automatically after payment confirmation. Uncomment the following navigation step if needed in case of behaviour change.
    // await test.step('Navigate to Orders', async () => {
    //     await storePaymentsPage.navigateToOrders();
    // });
    await test.step('Verify order completion', async () => {
        await storeOrdersPage.verifyOrderCompletion(item.name, totalPrice, cartItemId, item.price);

        console.log(`I ordered ${PURCHASE_QUANTITY} ${item.name} successfully!`);

    });
} else {
    console.log(`Not enough stock to purchase ${PURCHASE_QUANTITY} ${item.name}. Available quantity: ${item.quantity}`);
}
  });
}








// E2E TEST - Purchase a certain amount of newly added items //

 for (const item of newStockOfItems) {

  test(`Add ${PURCHASE_QUANTITY} ${item.productName} and purchase it`, async ({ page }) => {
   
    const itemId = NEW_ITEM_IDS[0].toString();
    const totalPrice = item.price * PURCHASE_QUANTITY;
    const cartItemId = idItemInCart[0]!.toString();


    // Go to store/inventory and add product to inventory
    await test.step('Navigate to Inventory', async () => {
      await storeHomePage.getToStore();
      await storeHomePage.navigateToInventory();
    });

    await test.step(`Add item: ${item.productName}`, async () => {
      
      await storeInventoryPage.addNewInventoryItem(item.productName, item.price, item.quantity);
    });

    await test.step(`Verify item: ${item.productName} appears in Inventory`, async () => {
      await storeInventoryPage.checkInventoryItemName(itemId, item.productName);
      await storeInventoryPage.checkInventoryItemStock(itemId, item.quantity);
      await storeInventoryPage.checkInventoryItemPrice(itemId, item.price);
    });


    //  Check the item in catalog and add it to cart if there is stock available
    await test.step('Navigate to Catalog', async () => {
      await storeCatalogPage.navigateToCatalog();
    });
if (item.quantity >= PURCHASE_QUANTITY) {
    await test.step(`Verify item: ${item.productName} appears in Catalog`, async () => {
      await storeCatalogPage.verifyItemName(itemId, item.productName);
      await storeCatalogPage.verifyItemPrice(itemId, item.price);
      await storeCatalogPage.verifyItemQuantity(itemId, item.quantity);
        if (item.quantity > 0) {                                               //Checking if there is stock or not
        await storeCatalogPage.checkAddItemToCart(itemId);
        }
         else {
        await storeCatalogPage.checkOutOfStock(itemId);
         }
    });

    await test.step(`Add to cart ${PURCHASE_QUANTITY}x ${item.productName}`, async () => {
        for (let i = 0; i < PURCHASE_QUANTITY; i++) {
            await storeCatalogPage.addItemToCart(itemId, item.quantity - i);
        }
    });


    // Verify the item in the cart as well as the total price and proceed to payment 
    await test.step(`Navigate to Cart`, async () => {
        await storeCatalogPage.navigateToCart();
    });

    await test.step(`Verify item ${item.productName} in Cart`, async () => {
    
        await storeCartPage.verifyCartItemDetails(cartItemId, item.price, PURCHASE_QUANTITY, item.price * PURCHASE_QUANTITY, item.productName);
        
    });
    
    await test.step(`Verify total price in Cart for item ${item.productName}`, async () => {
        await storeCartPage.verifyTotalCartPrice(totalPrice);
    });


    // Check the item on Payments page and confirm the payment 
    await test.step('Navigate to Payments', async () => {
        await storeCartPage.navigateToPayments();
    });

    await test.step(`Verify item ${item.productName} in Payments`, async () => {
        await storePaymentsPage.verifyItemDetails(item.productName, item.price, PURCHASE_QUANTITY, item.price * PURCHASE_QUANTITY, cartItemId);
    });

    await test.step(`Verify total payment price for item ${item.productName}`, async () => {
        await storePaymentsPage.verifyTotalPaymentPrice(totalPrice);
    });

    await test.step('Confirm Payment', async () => {
        await storePaymentsPage.selectPaymentOption(paymentCards.visa.displayName);
        await storePaymentsPage.confirmPayment();
    });


    // Verify the order completion on Orders page

    // The navigation to Orders is done automatically after payment confirmation. Uncomment the following navigation step if needed in case of behaviour change.
    // await test.step('Navigate to Orders', async () => {
    //     await storePaymentsPage.navigateToOrders();
    // });

    await test.step('Verify order completion', async () => {
        await storeOrdersPage.verifyOrderCompletion(item.productName, totalPrice, cartItemId, item.price);
    });

    console.log(`I ordered ${PURCHASE_QUANTITY} ${item.productName} successfully!`);

    // If there is not enough stock, log a message
    } else {

        if (item.quantity == 0) {  

         await storeCatalogPage.checkOutOfStock(itemId);                                               //Checking if there is stock or not
        console.log(`${item.productName} is Out of Stock`); 
        }
            else {                                                                        //Checks if there is insuficient stock
            console.log(`Not enough stock to purchase ${PURCHASE_QUANTITY} ${item.productName}. Available quantity: ${item.quantity}`); 
        }
        }
    
    });   
}


