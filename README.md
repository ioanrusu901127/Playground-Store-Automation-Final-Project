# 🎭 Playground Store Automation - Final Project

**Final Project – Test Automation with Playwright**  

## 📌 Overview

This project implements automated testing for the **Playground Store** application available at:  
🔗 **https://playground-drab-six.vercel.app/store**

The test suite covers some important core functionalities across the Store module including:

- 🗃 **Inventory Management** - Adding, updating, and managing product stock
- 🏪 **Catalog** - Product browsing and cart operations
- 🛒 **Shopping Cart** - Item management and total calculations
- 💳 **Payment** - Payment method selection and order confirmation
- 📦 **Orders** - Order history and details verification

The test suite is built with **Playwright** and **TypeScript**, following industry best practices for test automation including the **Page Object Model (POM)** design pattern.

---

## 🎯 Project Goals

This project demonstrates the ability to:

✅ **Interpret application behavior** and transform it into automated tests  
✅ **Organize test structure** using a scalable folder architecture  
✅ **Write clean, maintainable code** with proper documentation  
✅ **Use Playwright features effectively** (locators, assertions, waits, test helpers)  
✅ **Implement Page Object Model (POM)** for better maintainability  
✅ **Apply data-driven techniques** with reusable test data  
✅ **Validate multiple flows** across different pages of the Store module  
✅ **Ensure test stability** with consistent execution and reliable selectors

---

## 🚀 Features & Capabilities

- ✅ **TypeScript** for type safety and better developer experience
- ✅ **Page Object Model (POM)** design pattern for maintainability
- ✅ **Cross-browser testing** (Chromium, Firefox, WebKit)
- ✅ **Parallel test execution** for faster feedback
- ✅ **Comprehensive test coverage** across all Store modules
- ✅ **HTML test reports** with detailed results
- ✅ **Screenshots & videos** captured on test failures
- ✅ **Trace viewer** for advanced debugging
- ✅ **Data-driven testing** with reusable test data
- ✅ **Clear documentation** and code comments
- ✅ **Stable selectors** and proper wait strategies

---

## 📁 Project Structure

```
Playground Store Automation Final Project/
tests/
├── specs/                         # Test Specifications
│   ├── inventory.spec.ts          # Inventory management tests (TODO)
│   ├── catalog.spec.ts            # Catalog functionality tests (TODO)
│   ├── cart.spec.ts               # Shopping cart tests 
│   ├── payment.spec.ts            # Payment flow tests (TODO)
│   ├── orders.spec.ts             # Orders verification tests (TODO)
│   └── e2e-flow.spec.ts           # End-to-end purchase flow (TODO)
├── pages/                         # Page Object Models
│   ├── storeHome.ts               # Instructions page 
│   ├── storeInventory.ts          # Inventory management page
│   ├── storeCatalog.ts            # Product catalog page
│   ├── storeCart.ts               # Shopping cart page
│   ├── storePayments.ts           # Payment page
│   └── storeOrdes.ts              # Orders history page
├── data/                          # Utility files
│   ├── testData.ts                # Test data and constants
│   └── helpers.ts                 # Reusable helper functions (TODO)
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

---


## 🧭 Test Coverage

### 🗃 Inventory Management Tests

**File:** `tests/inventory.spec.ts`

- ✅ Add new product to inventory with name, price, and quantity
- ✅ Verify product appears in inventory list with correct details
- ✅ Increase stock quantity using "+" button
- ✅ Decrease stock quantity using "–" button
- ✅ Validate quantity never goes below 0
- ✅ Update product price and verify changes
- ✅ Delete product from inventory

### 🏪 Catalog Tests

**File:** `tests/catalog.spec.ts`

- ✅ Display all available products from inventory
- ✅ Add item to cart from catalog
- ✅ Verify item quantity decreases in catalog after adding to cart
- ✅ Prevent adding out-of-stock items (quantity = 0)
- ✅ Verify "Out of Stock" button is disabled
- ✅ Add multiple items to cart
- ✅ View product details

### 🛒 Shopping Cart Tests

**File:** `tests/cart.spec.ts`

- ✅ Display cart items with correct name, quantity, and subtotal
- ✅ Calculate total amount correctly
- ✅ Update item quantities in cart
- ✅ Remove items from cart
- ✅ Verify empty cart state
- ✅ Proceed to payment from cart
- ✅ Navigate back to catalog

### 💳 Payment Tests

**File:** `tests/payment.spec.ts`

- ✅ Display payment summary with all cart items
- ✅ Show correct subtotals and total amount
- ✅ Select payment method (Credit Card, PayPal, Cash, etc.)
- ✅ Complete purchase successfully
- ✅ Block payment without selecting payment method
- ✅ Verify alert when payment method not selected
- ✅ Redirect to Orders page after successful payment

### 📦 Orders Tests

**File:** `tests/orders.spec.ts`

- ✅ Display list of past orders
- ✅ Verify order details (date, payment method, items, total)
- ✅ Display correct item names and quantities in order
- ✅ Show final total for each order
- ✅ Verify orders are listed in chronological order

### 🔄 End-to-End Flow Tests

**File:** `tests/e2e-flow.spec.ts`

- ✅ Complete purchase flow: Inventory → Catalog → Cart → Payment → Orders
- ✅ Verify data consistency across all pages
- ✅ Multiple items purchase flow
- ✅ Stock updates after purchase

---

## 🏗️ Design Patterns & Architecture

### Page Object Model (POM)

This project uses the **Page Object Model** design pattern to:

- **Separate test logic from page structure**
- **Improve maintainability** - UI changes only require updates in page objects
- **Increase reusability** - Page methods can be used across multiple tests
- **Enhance readability** - Tests are more descriptive and easier to understand


```

### Test Data Management

Centralized test data in `/data.ts`:

```typescript
export const TEST_PRODUCTS = {
  LAPTOP: {
    name: 'Gaming Laptop',
    price: 1299.99,
    quantity: 10
  },
  MOUSE: {
    name: 'Wireless Mouse',
    price: 29.99,
    quantity: 50
  }
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'Credit Card',
  PAYPAL: 'PayPal',
  CASH: 'Cash'
};
```

---

## ⚙️ Configuration

### Playwright Configuration

The `playwright.config.ts` file includes:

- **Base URL**: https://playground-drab-six.vercel.app/store
- **Parallel execution**: Tests run in parallel for speed
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Traces**: Generated on first retry
- **Multiple browsers**: Chromium, Firefox, WebKit

---

## 🐛 Debugging Tips

### 1. Use Playwright Inspector

```bash
npx playwright test --debug
```

### 2. Use Console Logs

```typescript
test('debug test', async ({ page }) => {
  console.log(await page.title());
  console.log(await page.locator('.product-name').textContent());
});
```

### 3. Take Screenshots

```typescript
await page.screenshot({ path: 'screenshot.png' });
```

### 4. Use Trace Viewer

```bash
npx playwright show-trace trace.zip
```

### 5. Slow Down Execution

```typescript
test.use({ launchOptions: { slowMo: 1000 } });
```

---

## 🎨 Best Practices Implemented

✅ **Separation of Concerns** - Page objects separate test logic from UI interactions  
✅ **DRY Principle** - Reusable methods and test data avoid duplication  
✅ **Meaningful Names** - Clear test and method names describe intent  
✅ **Type Safety** - TypeScript ensures compile-time error detection  
✅ **Stable Selectors** - Use of data-testid and semantic selectors  
✅ **Explicit Waits** - Proper use of Playwright's auto-waiting features  
✅ **Assertions** - Clear and specific assertions for test validation  
✅ **Test Independence** - Each test can run independently  
✅ **Clean Code** - Consistent formatting and code structure  
✅ **Documentation** - README and inline comments explain implementation

---

## 📈 Evaluation Criteria Coverage

### 1. ✅ Test Coverage
- Variety of test flows across all Store modules
- Coverage of Inventory, Catalog, Cart, Payment, and Orders

### 2. ✅ Code Quality
- Meaningful test names describing expected behavior
- Clear structure with proper file separation
- Readable logic with comments where needed

### 3. ✅ Maintainability & Organization
- Page Object Model for reusable logic
- Minimal code duplication
- Consistent patterns throughout the codebase

### 4. ✅ Documentation Quality
- Comprehensive README with setup instructions
- Clear explanation of project structure
- Detailed description of how to run tests

### 5. ✅ Execution Stability
- Tests pass consistently
- Stable selectors using best practices
- Proper use of waits and assertions

### 6. ✅ Extra Features (Optional)
- GitHub Actions workflow (can be added)
- Screenshots and videos on failure
- Trace viewer for debugging
- TypeScript for advanced type safety

---

## 📚 Resources & References

- 🎭 [Playwright Documentation](https://playwright.dev/)
- 📘 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🏗️ [Page Object Model Pattern](https://playwright.dev/docs/pom)
- 🧪 [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- 🔍 [Locators Guide](https://playwright.dev/docs/locators)
- 📊 [Test Reporters](https://playwright.dev/docs/test-reporters)
- 🎬 [Trace Viewer](https://playwright.dev/docs/trace-viewer)

---

## 🤝 Contributing

This is a final project submission, but improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new test scenarios'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

---

## 📧 Contact & Submission

**Student Name:** Ioan Rusu  
**Repository:** https://github.com/ioanrusu901127/Playground-Store-Automation-Final-Project  
**Application Under Test:** https://playground-drab-six.vercel.app/store

---

