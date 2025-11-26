import { Page, Locator, expect } from '@playwright/test';
import { headersPages } from '../data/store.pages.data';
import { time } from 'console';



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

  // Initial navigation - call ONCE at test start
  async getToStore() {
    await this.page.goto('/store', { waitUntil: 'networkidle', timeout: 30000 });
    await expect(this.homeButton).toBeVisible();
  }

  async navigateToHome() {
    await this.homeButton.click();
    await expect(this.headerHome).toBeVisible({ timeout: 10000 });
    await expect(this.headerHome).toHaveText(headersPages.home);
  }

  async navigateToInventory() {
    await this.inventoryButton.click();
    await expect(this.headerInventory).toBeVisible({ timeout: 10000 });
    await expect(this.headerInventory).toHaveText(headersPages.inventory);
  }

  async navigateToCatalog() {
    await this.catalogButton.click();
    await expect(this.headerCatalog).toBeVisible({ timeout: 10000 });
    await expect(this.headerCatalog).toHaveText(headersPages.catalog);
  }

  async navigateToCart() {
    await this.cartButton.click();
    await expect(this.headerCart).toBeVisible({ timeout: 10000 });
    await expect(this.headerCart).toHaveText(headersPages.cart);
  }

  async navigateToPayments() {
    await this.paymentsButton.click();
    await expect(this.headerPayments).toBeVisible({ timeout: 10000 });
    await expect(this.headerPayments).toHaveText(headersPages.payments);
  }

  async navigateToOrders() {
    await this.ordersButton.click();
    await expect(this.headerOrders).toBeVisible({ timeout: 10000 });
    await expect(this.headerOrders).toHaveText(headersPages.orders);
  }
}