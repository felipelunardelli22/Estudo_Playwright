# Projeto de Automação de Testes - Playwright

Este projeto tem como objetivo a automação de testes end-to-end (E2E) utilizando Playwright, aplicando boas práticas como Page Object Model (POM), separação de locators, organização por camadas e estrutura escalável.

## Tecnologias Utilizadas

- Node.js
- Playwright
- JavaScript / TypeScript
- Page Object Model (POM)
- Git

## Estrutura do Projeto

```bash
├── locators
│   ├── login_locators.js        # Seletores da página de login
│   ├── carrinho_locators.js     # Seletores do carrinho
│   └── products_locators.js     # Seletores dos produtos
│
├── pages
│   ├── login.page.js            # Ações da página de login
│   ├── carrinho.page.js         # Ações do carrinho
│   └── products.page.js         # Ações dos produtos
│
├── tests
│   ├── login.spec.ts            # Cenários de login
│   ├── carrinho.spec.ts         # Cenários do carrinho
│   └── products.spec.ts         # Cenários de produtos