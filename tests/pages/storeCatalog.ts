import { Page, expect, Locator } from '@playwright/test'; 


export class StoreCatalogPage {
    readonly page: Page
    readonly itemNameLocator: (name: string) => Locator
    readonly itemPriceLocator: (name: string) => Locator
    readonly itemQuantityLocator: (name: string) => Locator
    readonly addToCartButtonLocator: (name: string) => Locator
    readonly homeButton: Locator;
    readonly inventoryButton: Locator;
    readonly catalogButton: Locator;
    readonly cartButton: Locator;
    readonly paymentsButton: Locator;
    readonly ordersButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.itemNameLocator = (name: string) => page.getByTestId('catalog-item-name-'+ name);
        this.itemPriceLocator = (name: string) => page.getByTestId('catalog-item-price-value-'+ name);
        this.itemQuantityLocator = (name: string) => page.getByTestId('catalog-item-quantity-'+ name);
        this.addToCartButtonLocator = (name: string) => page.getByTestId('catalog-item-add-button-'+ name);
        this.homeButton = page.getByTestId('store-tab-home');
        this.inventoryButton = page.getByTestId('store-tab-inventory');
        this.catalogButton = page.getByTestId('store-tab-catalog');
        this.cartButton = page.getByTestId('store-tab-cart');
        this.paymentsButton = page.getByTestId('store-tab-payments')
        this.ordersButton = page.getByTestId('store-tab-orders');
    }


    // Simple navigations to other pages (without refreshing or losing the data from the page)

    async navigateToHome() {
    await this.homeButton.click();
  };

    async navigateToInventory() {
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


 // Methods for checking for item details in the catalog:

    async verifyItemName(name: string, expectedName: string) {
        const itemName = this.itemNameLocator(name);
        await expect(itemName).toBeVisible();
        await expect(itemName).toHaveText(expectedName);
    }


    async verifyItemPrice(name: string, price: number) {
        const itemPrice = this.itemPriceLocator(name);
        await expect(itemPrice).toBeVisible();
        await expect(itemPrice).toHaveText(`${price.toFixed(2)}`);
    }


    async verifyItemQuantity(name: string, quantity: number) {
        const itemQuantity = this.itemQuantityLocator(name);
        await expect(itemQuantity).toBeVisible();
        await expect(itemQuantity).toHaveText(`${quantity} units`);  
    }


    async checkAddItemToCart(name: string) {
        await expect(this.addToCartButtonLocator(name)).toBeVisible();
        
        await expect(this.addToCartButtonLocator(name)).toHaveText('Add to Cart'); 
    };


    async addItemToCart(name: string, quantity: number) {
        await this.addToCartButtonLocator(name).click();
        // Verify that the quantity decreases by 1 after adding to cart
        await expect(this.itemQuantityLocator(name)).toHaveText(`${quantity - 1} units`);
    };
        
    
    async checkOutOfStock(name: string) {
        await expect(this.addToCartButtonLocator(name)).toBeVisible();
        await expect(this.addToCartButtonLocator(name)).toHaveText('Out of Stock'); 
    }   

    async verifyNewItemInCatalog(name: string, price: number, quantity: number) {
        await this.verifyItemName(name, name);
        await this.verifyItemPrice(name, price);
        await this.verifyItemQuantity(name, quantity);
        if (quantity > 0) {
            await this.checkAddItemToCart(name);
        } else {
            await this.checkOutOfStock(name);
        }
    }
}

