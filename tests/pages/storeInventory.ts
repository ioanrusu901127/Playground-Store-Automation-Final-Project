import { Page, Locator , expect } from '@playwright/test';
import { StoreHomePage } from './storeHome';

export class StoreInventoryPage {
    readonly page: Page;
    readonly storeHomePage: StoreHomePage;
    readonly productNameInput: Locator;
    readonly priceInput: Locator;
    readonly quantityInput: Locator;
    readonly addProductButton: Locator;
    readonly inventoryButton: Locator;
    readonly homeButton: Locator;
    readonly catalogButton: Locator;
    readonly cartButton: Locator;
    readonly paymentsButton: Locator;
    readonly ordersButton: Locator;
    readonly increaseQuantityButton: (name: string) => Locator;
    readonly decreaseQuantityButton: (name: string) => Locator;
    readonly quantityLocator: (name: string) => Locator;
    readonly nameLocator: (name: string) => Locator;
    readonly priceLocator: (name: string) => Locator;


  constructor(page: Page) {
    this.page = page;
    this.storeHomePage = new StoreHomePage(page);
    this.productNameInput = page.getByTestId('inventory-input-name')
    this.priceInput = page.getByTestId('inventory-input-price')
    this.quantityInput = page.getByTestId('inventory-input-quantity')
    this.addProductButton = page.getByTestId('inventory-submit-button')
    this.increaseQuantityButton = (name: string) => page.getByTestId('inventory-product-increase-'+name)
    this.decreaseQuantityButton = (name: string) => page.getByTestId('inventory-product-decrease-'+name)
    this.homeButton = page.getByTestId('store-tab-home');
    this.inventoryButton = page.getByTestId('store-tab-inventory');
    this.catalogButton = page.getByTestId('store-tab-catalog');
    this.cartButton = page.getByTestId('store-tab-cart');
    this.paymentsButton = page.getByTestId('store-tab-payments')
    this.ordersButton = page.getByTestId('store-tab-orders');
    this.quantityLocator = (name: string) => page.getByTestId('inventory-product-quantity-' + name);
    this.nameLocator = (name: string) => page.getByTestId('inventory-product-name-' + name);
    this.priceLocator = (name: string) => page.getByTestId('inventory-product-price-value-' + name);
    
  }

  // Simple navigations to other pages (without refreshing or losing the data from the page)

  async navigateToHome() {
    await this.homeButton.click();
  };

  async navigateToinventory() {
    await this.inventoryButton.click();
  };

  async navigateToCatalog() {
    await this.catalogButton.click();
  };    

  async navigateToCart() {
    await this.cartButton.click();
  };

  async navigateToPayments() {
    await this.paymentsButton.click();
  };

  async navigateToOrders() {
    await this.ordersButton.click();
  };



//Methods for checking the name, stock and price of inventory items

  async checkInventoryItemName(productName: string, expectedName: string) {
    const nameLocator = this.nameLocator(productName);
    await expect(nameLocator).toBeVisible();
    await expect(nameLocator).toHaveText(expectedName);
  }

  async checkInventoryItemStock(productName: string, Quantity: number) {
    const quantityLocator = this.quantityLocator(productName);
    await expect(quantityLocator).toBeVisible();
    await expect(quantityLocator).toHaveText(Quantity.toString());
  }

  async checkInventoryItemPrice(productName: string, expectedPrice: number) {
    
    await expect(this.priceLocator(productName)).toBeVisible();
    await expect(this.priceLocator(productName)).toHaveText(`${expectedPrice.toFixed(2)}`);
  } 


// Methods to add new inventory items

  async addItemName(productName: string) {
    await expect (this.productNameInput).toBeVisible();
    await this.productNameInput.fill(productName);
  }

  async addNewItemPrice(price: number) { 
    await expect (this.priceInput).toBeVisible();
    await this.priceInput.fill(price.toString());
  }

  async addNewItemQuantity(quantity: number) {
    await expect (this.quantityInput).toBeVisible();
    await this.quantityInput.fill(quantity.toString());
  }

  async clickAddProductButton() {
    await expect (this.addProductButton).toBeVisible();
    await this.addProductButton.click();
  }


  async addNewInventoryItem(productName: string, price: number, quantity: number) {
    await this.addItemName(productName);
    await this.addNewItemPrice(price);
    await this.addNewItemQuantity(quantity);
    await this.clickAddProductButton();
  }

  // Method for adding or removing items from the Inventory

  async addUnitsToInventoryItem(itemId: string, unitsToAdd: number) {
    for (let i = 0; i < unitsToAdd; i++) {
      await this.increaseQuantityButton(itemId).click();
    }
    // Get current quantity after adding
    const currentQuantity = await this.quantityLocator(itemId).textContent();
    await expect(this.quantityLocator(itemId)).toHaveText(currentQuantity || '');
  }

  async removeOneUnitFromInventoryItem(itemId: string, currentQuantity: number) {
    if (currentQuantity > 0) {
      await this.decreaseQuantityButton(itemId).click();
      await expect(this.quantityLocator(itemId)).toHaveText((currentQuantity - 1).toString());
    } else {
      console.log(`⚠️ No units to remove for item ID: ${itemId}`);
    }
  }

  async removeUnitsFromInventoryItem(itemId: string, unitsToRemove: number) {
    if (unitsToRemove > 0) {
      for (let i = 0; i < unitsToRemove; i++) {
        await this.decreaseQuantityButton(itemId).click();
      }
      await expect(this.quantityLocator(itemId)).toHaveText('0');
    } else {
      console.log(`⚠️ No units to remove for item ID: ${itemId}`);
    }
  }
}

