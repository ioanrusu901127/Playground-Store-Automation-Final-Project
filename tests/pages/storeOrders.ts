import { Page, Locator, expect } from '@playwright/test';

export class StoreOrdersPage {
    readonly page: Page
    readonly homeButton: Locator;
    readonly inventoryButton: Locator;
    readonly catalogButton: Locator;
    readonly cartButton: Locator;
    readonly paymentsButton: Locator;
    readonly ordersButton: Locator;
    readonly itemNameLocator: (name: string) => Locator;      // also contains the amount ordered
    readonly itemPriceLocator: (name: string) => Locator;
    readonly totalOrderPriceLocator: Locator;
    readonly paymentMethodLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByTestId('store-tab-home');
        this.inventoryButton = page.getByTestId('store-tab-inventory');
        this.catalogButton = page.getByTestId('store-tab-catalog');
        this.cartButton = page.getByTestId('store-tab-cart');
        this.paymentsButton = page.getByTestId('store-tab-payments')
        this.ordersButton = page.getByTestId('store-tab-orders');
        this.itemNameLocator = (name: string) => page.getByTestId('order-item-name-0-'+ name);
        this.itemPriceLocator = (name: string) => page.getByTestId('order-item-total-value-0-'+ name);
        this.totalOrderPriceLocator = page.getByTestId('order-total-value-0');
        this.paymentMethodLocator = page.getByTestId('order-payment-0');

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


 
    // Methods for checking for item details in the orders:

    async verifyOrderCompletion(name: string, price: number, itemID: string, unitPrice: number) {
        const quantity = price / unitPrice;

        await expect(this.itemNameLocator(itemID)).toBeVisible();
        await expect(this.itemNameLocator(itemID)).toHaveText(quantity + ' x ' + name);
        await expect(this.itemPriceLocator(itemID)).toBeVisible();
        await expect(this.itemPriceLocator(itemID)).toHaveText(`${price.toFixed(2)}`);
    }


    async verifyTotalOrderPrice(expectedTotal: number) {
        await expect(this.totalOrderPriceLocator).toBeVisible();
        await expect(this.totalOrderPriceLocator).toHaveText(`$${expectedTotal.toFixed(2)}`);
    }


    async verifyPaymentMethod(expectedMethod: string) {
        await expect(this.paymentMethodLocator).toBeVisible();
        await expect(this.paymentMethodLocator).toHaveText(expectedMethod);
    }   






}