import {test} from '@playwright/test'
import Data from "../testData/OrangeHRM_Creds.json"
import { LoginHelper } from "../pages/helperFunctions/loginHelper"
import { LoginPage } from "../pages/locators/login"

test('Log in Orange HRM using valid credentials',async({page})=>{
        const loginPage = new LoginPage(page)
        const loginHRM = new LoginHelper(loginPage)

        await loginHRM.navigateToLogin()
        await loginHRM.login(Data.Username,Data.Password)
        await loginHRM.assertDashboard()
})