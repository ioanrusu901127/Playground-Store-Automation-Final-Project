import { Page,  Locator, expect } from "@playwright/test";

export class StorePaymentsPage {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly inventoryButton: Locator;
    readonly catalogButton: Locator;
    readonly cartButton: Locator;
    readonly paymentsButton: Locator;
    readonly ordersButton: Locator;
    readonly itemNameLocator: (name: string) => Locator;
    readonly itemUnitPriceLocator: (name: string) => Locator;
    readonly itemQuantityLocator: (name: string) => Locator;
    readonly itemTotalPriceLocator: (name: string) => Locator;
    readonly totalPaymentPriceLocator: Locator;
    readonly paymentOptions: (name: string) => Locator;
    readonly confirmPaymentButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByTestId('store-tab-home');
        this.inventoryButton = page.getByTestId('store-tab-inventory');
        this.catalogButton = page.getByTestId('store-tab-catalog');
        this.cartButton = page.getByTestId('store-tab-cart');
        this.paymentsButton = page.getByTestId('store-tab-payments')
        this.ordersButton = page.getByTestId('store-tab-orders');
        this.itemNameLocator = (name: string) => page.getByTestId('payment-item-name-'+ name);
        this.itemUnitPriceLocator = (name: string) => page.getByTestId('payment-item-price-value-'+ name);
        this.itemQuantityLocator = (name: string) => page.getByTestId('payment-item-quantity-'+ name);
        this.itemTotalPriceLocator = (name: string) => page.getByTestId('payment-item-total-value-'+ name);
        this.totalPaymentPriceLocator = page.getByTestId('payment-total-value');
        this.paymentOptions = (name: string) => page.getByTestId('payment-option-input-' + name);
        this.confirmPaymentButton = page.getByTestId('payment-confirm-button');

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


    // Methods for checking for item details in the payments:

    async verifyItemDetails(name: string, expectedUnitPrice: number, expectedQuantity: number, expectedTotalPrice: number, itemID: string) {
        await expect(this.itemNameLocator(itemID)).toBeVisible();
        await expect(this.itemNameLocator(itemID)).toHaveText(name);
        await expect(this.itemUnitPriceLocator(itemID)).toBeVisible();
        await expect(this.itemUnitPriceLocator(itemID)).toHaveText(`${expectedUnitPrice.toFixed(2)}`);
        await expect(this.itemQuantityLocator(itemID)).toBeVisible();
        await expect(this.itemQuantityLocator(itemID)).toHaveText(expectedQuantity.toString());
        await expect(this.itemTotalPriceLocator(itemID)).toBeVisible();
        await expect(this.itemTotalPriceLocator(itemID)).toHaveText(`${expectedTotalPrice.toFixed(2)}`);
    }

}