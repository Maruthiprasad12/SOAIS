import { expect } from "@playwright/test";
import { LoginPage } from "../locators/login";

export class LoginHelper {
  private loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  // Navigate to login URL
  async navigateToLogin() {
    await this.loginPage.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  // Perform login using locators from POM
  async login(username: string, password: string) {
    await this.loginPage.username.fill(username);
    await this.loginPage.password.fill(password);
    await this.loginPage.loginBtn.click();
  }

  // Validate dashboard loaded successfully
  async assertDashboard() {
    await this.loginPage.page.waitForLoadState();
    await expect(this.loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(this.loginPage.timeAtWork).toBeVisible();
  }
}