import { ProductLocators } from '../Locators/products_locators';
import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.locators = ProductLocators;
  }

  async ordenarPorMenorPreco() {
    await this.page
      .locator(this.locators.SORT_SELECT)
      .selectOption({ label: 'Price (low to high)' });
  }

  async obterPrecos() {
    const array = await this.page
      .locator(this.locators.ITEM_PRICES)
      .allTextContents();

    return array.map(price =>
      parseFloat(price.replace('$', '').trim())
    );
  }

  async validarOrdenacaoCrescente() {
    const precos = await this.obterPrecos();

    for (let i = 0; i < precos.length - 1; i++) {
      expect(precos[i]).toBeLessThanOrEqual(precos[i + 1]);
    }
  }
  async abrirPrimeiroProduto() {
  await this.page
    .locator(this.locators.PRODUCT_NAME)
    .first()
    .click();
}

async validarImagemProduto() {
  const imagem = this.page.locator(this.locators.PRODUCT_IMAGE);
  await expect(imagem).toBeVisible();

  const srcEsperado =
    '/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg';

  await expect(imagem).toHaveAttribute('src', srcEsperado);
}
async validarUrlProduto() {
  await this.page.waitForURL('**/inventory-item.html?id=*');
}
async abrirPrimeiroProduto() {
  await this.page
    .locator(this.locators.PRODUCT_NAME)
    .first()
    .click();
}

async validarUrlProdutoDetalhe() {
  await expect(this.page).toHaveURL(
    'https://www.saucedemo.com/inventory-item.html?id=4'
  );
}
}