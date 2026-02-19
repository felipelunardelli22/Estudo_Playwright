import  { test,expect } from '@playwright/test';
import { LoginPage,CredencialInvalida } from '../Page/Pagina_login'

test('Login do usuario com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user','secret_sauce');
  const tituloProduto = await page.locator('.header_secondary_container > span')
  await expect(tituloProduto).toHaveText('Products');

});
test('Login do usuario com credencial incorreta', async ({ page }) => {
  const Credencial_Invalida = new CredencialInvalida();
  const CredencialSemAcesso = Credencial_Invalida.getInvalidCredentials();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(CredencialSemAcesso.username,CredencialSemAcesso.password);
  await page.locator('[data-test="error"]').isVisible();

});
