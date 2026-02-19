import  { test,expect } from "@playwright/test";
import { LoginPage } from '../Page/Pagina_login'
import { CarrinhoPage } from '../Page/Pagina_carrinho';


let loginPage: LoginPage;
let carrinhoPage: CarrinhoPage;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  carrinhoPage = new CarrinhoPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Adicionar item no carrinho de compras', async ({ page }) => {
  await carrinhoPage.adicionarPrimeiroItem();

  const contagemCarrinho = await carrinhoPage.obterQuantidadeCarrinho();
  await expect(contagemCarrinho).toBe('1');
});

test('remover item do carrinho de compras', async ({ page }) => {
   await carrinhoPage.adicionarItemPorIndice(0);
  await carrinhoPage.adicionarItemPorIndice(1);

  const contagemCarrinho = await carrinhoPage.obterQuantidadeCarrinho();
  await expect(contagemCarrinho).toBe('2');

  await carrinhoPage.acessarCarrinho();
  await carrinhoPage.removerBackpack();
})

test('Finalizar compras com sucesso', async () => {
await carrinhoPage.adicionarPrimeiroItem();

  const contagemCarrinho = await carrinhoPage.obterQuantidadeCarrinho();
  await expect(contagemCarrinho).toBe('1');

  await carrinhoPage.acessarCarrinho();
  await carrinhoPage.iniciarCheckout();

  await carrinhoPage.preencherDadosCheckout('Usuario', 'Teste', '01020110');

  await carrinhoPage.continuarCheckout();
  await carrinhoPage.finalizarCheckout();

  await carrinhoPage.validarCompraComSucesso();
});
test('Validar feedback de campos obrigatorios ao preencher dados pessoais', async ({page}) => {
  await carrinhoPage.adicionarPrimeiroItem();

  const contagemCarrinho = await carrinhoPage.obterQuantidadeCarrinho();
  await expect(contagemCarrinho).toBe('1');

  await carrinhoPage.acessarCarrinho();
  await carrinhoPage.iniciarCheckout();

  // Não preenche First Name de propósito
  await carrinhoPage.preencherDadosCheckout('', 'Teste', '01020110');

  await carrinhoPage.continuarCheckout();

  const mensagemErro = await page.locator('[data-test="error"]').innerText();
  await expect(mensagemErro).toBe('Error: First Name is required');
});

test('Validar calculo de valor do carrinho de compras', async () => {
  await carrinhoPage.adicionarItemPorIndice(0);
  await carrinhoPage.adicionarItemPorIndice(1);
  await carrinhoPage.adicionarItemPorIndice(2);

  await carrinhoPage.acessarCarrinho();

  const total = await carrinhoPage.calcularTotalCarrinho();

  const valorEsperado = 55.97;
  await expect(total).toBe(valorEsperado);
});