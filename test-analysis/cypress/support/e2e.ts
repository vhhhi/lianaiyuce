// 导入命令
import './commands';

// 忽略未捕获的异常
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// 添加自定义命令
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// 登录命令
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid=username]').type(username);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=submit]').click();
});

// 通过测试ID获取元素
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid=${testId}]`);
}); 