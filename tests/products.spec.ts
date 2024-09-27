import test, { expect } from "@playwright/test";
import { LoginPage } from './page_objects/Pagina_login'

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
});
test('Validar elementos ordenados do mais barato para o mais caro', async ({ page }) => {
    const variosElementos = page.locator('.product_sort_container');
    await variosElementos.selectOption({ label: 'Price (low to high)' });

    const array = await page.locator('[class="inventory_item_price"]').allTextContents();

    const precos = array.map(price => parseFloat(price.replace('$', '').trim()));

    for (let i = 0; i < precos.length - 1; i++) {
        expect(precos[i]).toBeLessThanOrEqual(precos[i + 1]);
    }

})
test('Validar Imagem dos itens', async ({ page }) => {

    const imageminicial = page.locator('[data-test="inventory-item-name"]').first();
    await imageminicial.click();
    await page.waitForURL('https://www.saucedemo.com/inventory-item.html?id=*');
    const imagemesperada = await page.locator('[data-test="item-sauce-labs-backpack-img"]');
    await expect(imagemesperada).toBeVisible();
    const src = '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg';
    await expect(imagemesperada).toHaveAttribute('src', src);
})
test('Validar detalhes do produto', async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]').first().click();
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory-item.html?id=4');
})







