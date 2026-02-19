import { CarrinhoLocators } from '../Locators/carrinho_locators'

export class CarrinhoPage {
  constructor(page) {
    this.page = page;
    this.carrinhoLocators = CarrinhoLocators;
  }

  async adicionarPrimeiroItem() {
    await this.page
      .locator(this.carrinhoLocators.ADD_TO_CART_BUTTONS)
      .first()
      .click();
  }

  async adicionarItemPorIndice(index) {
    await this.page
      .locator(this.carrinhoLocators.ADD_TO_CART_BUTTONS)
      .nth(index)
      .click();
  }

  async obterQuantidadeCarrinho() {
    return await this.page
      .locator(this.carrinhoLocators.CART_BADGE)
      .innerText();
  }
  
  async acessarCarrinho() {
    await this.page
      .locator(this.carrinhoLocators.CART_LINK)
      .click();
  }

  async removerBackpack() {
    await this.page
      .locator(this.carrinhoLocators.REMOVE_BACKPACK)
      .click();
  }

  // 🔽 NOVAS FUNÇÕES DO CHECKOUT 🔽

  async iniciarCheckout() {
    await this.page
      .locator(this.carrinhoLocators.CHECKOUT_BUTTON)
      .click();
  }

  async preencherDadosCheckout(nome, sobrenome, cep) {
    await this.page
      .locator(this.carrinhoLocators.FIRST_NAME)
      .fill(nome);

    await this.page
      .locator(this.carrinhoLocators.LAST_NAME)
      .fill(sobrenome);

    await this.page
      .locator(this.carrinhoLocators.POSTAL_CODE)
      .fill(cep);
  }

  async continuarCheckout() {
    await this.page
      .locator(this.carrinhoLocators.CONTINUE_BUTTON)
      .click();
  }

  async finalizarCheckout() {
    await this.page
      .locator(this.carrinhoLocators.FINISH_BUTTON)
      .click();
  }

  async validarCompraComSucesso() {
    await this.page
      .locator(this.carrinhoLocators.COMPLETE_HEADER)
      .waitFor();
  }
  async obterMensagemErro() {
  return await this.page
    .locator(this.carrinhoLocators.ERROR_MESSAGE)
    .innerText();
}
async calcularTotalCarrinho() {
  const precos = await this.page
    .locator(this.carrinhoLocators.ITEM_PRICES)
    .allTextContents();

  return precos.reduce((acc, preco) => {
    const precoValor = parseFloat(preco.replace('$', '').trim());
    return acc + precoValor;
  }, 0);
}
}