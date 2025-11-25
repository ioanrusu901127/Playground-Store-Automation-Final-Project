import { Page, Locator, expect } from '@playwright/test';

export class StoreCartPage {
    readonly page: Page
    readonly homeButton: Locator;
    readonly inventoryButton: Locator;
    readonly catalogButton: Locator;
    readonly cartButton: Locator;
    readonly paymentsButton: Locator;
    readonly ordersButton: Locator;
    readonly itemNameLocator: (name: string) => Locator
    readonly itemUnitPriceLocator: (name: string) => Locator
    readonly itemQuantityLocator: (name: string) => Locator
    readonly itemTotalPriceLocator: (name: string) => Locator
    readonly totalCartPriceLocator: Locator
    readonly goToPaymentsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByTestId('store-tab-home');
        this.inventoryButton = page.getByTestId('store-tab-inventory');
        this.catalogButton = page.getByTestId('store-tab-catalog');
        this.cartButton = page.getByTestId('store-tab-cart');
        this.paymentsButton = page.getByTestId('store-tab-payments')
        this.ordersButton = page.getByTestId('store-tab-orders');
        this.itemNameLocator = (name: string) => page.getByTestId('cart-item-name-'+ name);
        this.itemUnitPriceLocator = (name: string) => page.getByTestId('cart-item-price-value-'+ name);
        this.itemQuantityLocator = (name: string) => page.getByTestId('cart-item-quantity-'+ name);
        this.itemTotalPriceLocator = (name: string) => page.getByTestId('cart-item-total-value-'+ name);
        this.totalCartPriceLocator = page.getByTestId('cart-total-value');
        this.goToPaymentsButton = page.getByTestId('cart-go-to-payment');
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
    
    // Methods for checking for item details in the cart:

    async verifyCartItemDetails(name: string, unitPrice: number, quantity: number, totalPrice: number, actualName: string) {
        await expect(this.itemNameLocator(name)).toBeVisible();
        await expect(this.itemNameLocator(name)).toHaveText(actualName);
        await expect(this.itemUnitPriceLocator(name)).toBeVisible();
        await expect(this.itemUnitPriceLocator(name)).toHaveText(`${unitPrice.toFixed(2)}`);
        await expect(this.itemQuantityLocator(name)).toBeVisible();
        await expect(this.itemQuantityLocator(name)).toHaveText(quantity.toString());
        await expect(this.itemTotalPriceLocator(name)).toBeVisible();
        await expect(this.itemTotalPriceLocator(name)).toHaveText(`${totalPrice.toFixed(2)}`);          

        
    }

    async verifyTotalCartPrice(expectedTotalPrice: number) {
        await expect(this.totalCartPriceLocator).toBeVisible();
        await  expect(this.totalCartPriceLocator).toHaveText(`${expectedTotalPrice.toFixed(2)}`);
    }





}
