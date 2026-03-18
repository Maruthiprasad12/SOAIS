import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly timeAtWork: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.getByRole("button", { name: ' Login ' });
    this.timeAtWork = page.locator("//p[text()='Time at Work']");
  }
}