import test, { expect } from "@playwright/test";
import { LoginPage } from './page_objects/Pagina_login'

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
});

test('Adicionar item no carrinho de compras', async ({ page }) => {
    const adicionarCarrinho = page.locator('.btn_inventory').first();
    await adicionarCarrinho.click();

    const contagemCarrinho = await page.locator('.shopping_cart_badge').innerText();
    expect(contagemCarrinho).toBe('1');
})
test('remover item do carrinho de compras', async ({ page }) => {
    await page.locator('.btn_inventory').nth(0).click();
    await page.locator('.btn_inventory').nth(1).click();
    
    const contagemCarrinho = await page.locator('.shopping_cart_badge').innerText();
    expect(contagemCarrinho).toBe('2')

    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
})

test('Finalizar compras com sucesso', async ({ page }) => {
    const adicionarCarrinho = page.locator('.btn_inventory').first();
    await adicionarCarrinho.click();

    const contagemCarrinho = await page.locator('.shopping_cart_badge').innerText();
    expect(contagemCarrinho).toBe('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('.cart_footer #checkout').click();
    await page.locator('#first-name').fill('Usuario');
    await page.locator('#last-name').fill(' Teste');
    await page.locator('#postal-code').fill('01020110');
    await page.locator('#continue').click();
    await page.locator('#finish').click();

    expect('data-test="complete-header"')
})
test('Validar feedback de campos obrigatorios ao preencher dados pessoais', async ({ page }) => {
    const adicionarCarrinho = page.locator('.btn_inventory').first();
    await adicionarCarrinho.click();

    const contagemCarrinho = await page.locator('.shopping_cart_badge').innerText();
    expect(contagemCarrinho).toBe('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('.cart_footer #checkout').click();
    await page.locator('#last-name').fill(' Teste');
    await page.locator('#postal-code').fill('01020110');
    await page.locator('#continue').click();
    const textoElemento = await page.locator('[data-test="error"]').innerText();
    expect(textoElemento).toBe('Error: First Name is required');

})

test('Validar calculo de valor do carinho de compras', async ({ page }) => {
    await page.locator('.btn_inventory').nth(0).click();
    await page.locator('.btn_inventory').nth(1).click();
    await page.locator('.btn_inventory').nth(2).click();
    await page.locator('.shopping_cart_link').click();
    const precos = await page.locator('.cart_item .inventory_item_price').allTextContents();
    const total = precos.reduce((acc, preco) => {
        const precoValor = parseFloat(preco.replace('$', '').trim());
        return acc + precoValor;
    }, 0);
    const valorTotal =  55.97; 
    expect(total).toBe(valorTotal);

})