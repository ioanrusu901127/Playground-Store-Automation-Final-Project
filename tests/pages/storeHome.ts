import { Page, Locator, expect } from '@playwright/test';
import { headersPages } from '../data/store.pages.data';



export class StoreHomePage {
  readonly page: Page;
  readonly homeButton: Locator;
  readonly inventoryButton: Locator;
  readonly catalogButton: Locator;
  readonly cartButton: Locator;
  readonly paymentsButton: Locator;
  readonly ordersButton: Locator;
  readonly headerHome: Locator;
  readonly headerInventory: Locator;
  readonly headerCatalog: Locator;
  readonly headerCart: Locator;
  readonly headerPayments: Locator;
  readonly headerOrders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.getByTestId('store-tab-home');
    this.inventoryButton = page.getByTestId('store-tab-inventory');
    this.catalogButton = page.getByTestId('store-tab-catalog');
    this.cartButton = page.getByTestId('store-tab-cart');
    this.paymentsButton = page.getByTestId('store-tab-payments')
    this.ordersButton = page.getByTestId('store-tab-orders');
    this.headerHome = page.getByTestId('instructions-title');
    this.headerInventory = page.getByTestId('inventory-title');
    this.headerCatalog = page.getByTestId('catalog-title');
    this.headerCart = page.getByTestId('cart-title');
    this.headerPayments = page.getByTestId('payment-title')
    this.headerOrders = page.getByTestId('orders-title');

  }

  async navigateToHome() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.homeButton).toBeVisible();
    await this.homeButton.click({ timeout: 5000 });
    //await expect(this.headerHome).toBeVisible();
    await expect(this.headerHome).toHaveText(headersPages.home);

  }

  async navigateToInventory() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.inventoryButton).toBeVisible();
    await this.inventoryButton.click({ timeout: 5000 });
    await expect(this.headerInventory).toBeVisible();
    await expect(this.headerInventory).toHaveText(headersPages.inventory);

  }

  async navigateToCatalog() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.catalogButton).toBeVisible();
    await this.catalogButton.click({ timeout: 5000 });
    await expect(this.headerCatalog).toBeVisible();
    await expect(this.headerCatalog).toHaveText(headersPages.catalog);
  }

    async navigateToCart() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.cartButton).toBeVisible();
    await this.cartButton.click({ timeout: 5000 });
    await expect(this.headerCart).toBeVisible();
    await expect(this.headerCart).toHaveText(headersPages.cart);
  }
    async navigateToPayments() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.paymentsButton).toBeVisible();
    await this.paymentsButton.click({ timeout: 5000 });
    await expect(this.headerPayments).toBeVisible();
    await expect(this.headerPayments).toHaveText(headersPages.payments);
  }
    async navigateToOrders() {
    await this.page.goto('/store', { waitUntil: 'domcontentloaded' });
    await expect(this.ordersButton).toBeVisible();
    await this.ordersButton.click({ timeout: 5000 });
    await expect(this.headerOrders).toBeVisible();
    await expect(this.headerOrders).toHaveText(headersPages.orders);
  }
}