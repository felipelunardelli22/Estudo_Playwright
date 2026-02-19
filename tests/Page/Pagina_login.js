import { LoginLocators } from '../Locators/login_locators'

class LoginPage {
    constructor(page) {
        this.page = page;
        this.locators = LoginLocators;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username, password) {
        await this.page.fill(this.locators.USERNAME_INPUT, username);
        await this.page.fill(this.locators. PASSWORD_INPUT, password);
        await this.page.click(this.locators.LOGIN_BUTTON);
    }
}

class CredencialInvalida {
    getInvalidCredentials() {
        return {
            username: 'teste',
            password: 'teste'
        };
    }
}


export {LoginPage,CredencialInvalida};
