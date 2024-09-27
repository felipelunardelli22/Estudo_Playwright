class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username,password) {
        await this.page.fill(this.usernameInput, 'standard_user');
        await this.page.fill(this.passwordInput, 'secret_sauce');
        await this.page.click(this.loginButton);
    }
}
class CredencialInvalida{
    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }
    getInvalidCredentials() {
       
        return {
            username: 'teste',
            password: 'teste',
        };
    }
    
}

export {LoginPage,CredencialInvalida};
