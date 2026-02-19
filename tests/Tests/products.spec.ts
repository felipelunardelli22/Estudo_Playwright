import { test, expect } from "@playwright/test";
import { LoginPage } from '../Page/Pagina_login';
import { ProductsPage } from '../Page/Pagina_products'

let productPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  productPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Validar elementos ordenados do mais barato para o mais caro', async () => {
  await productPage.ordenarPorMenorPreco();
  await productPage.validarOrdenacaoCrescente();
});

test('Validar Imagem dos itens', async ({ page }) => {
  const productPage = new ProductsPage(page);

  await productPage.abrirPrimeiroProduto();
  await productPage.validarUrlProduto();
  await productPage.validarImagemProduto();
});
test('Validar detalhes do produto', async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.abrirPrimeiroProduto();
  await productPage.validarUrlProdutoDetalhe();
});







