// 扩展 Cypress 命令
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// 添加检查图表渲染的命令
Cypress.Commands.add('checkChartRendering', (selector: string) => {
  cy.get(selector)
    .should('be.visible')
    .find('canvas')
    .should('have.length.at.least', 1);
});

// 添加检查列表项的命令
Cypress.Commands.add('checkListItems', (selector: string, minItems: number = 1) => {
  cy.get(selector)
    .should('be.visible')
    .find('li')
    .should('have.length.at.least', minItems);
});

// 添加检查加载状态的命令
Cypress.Commands.add('checkLoadingState', () => {
  cy.getByTestId('loading-state')
    .should('be.visible')
    .then(($loading) => {
      // 等待加载状态消失
      cy.wrap($loading).should('not.exist');
    });
});

// 添加检查错误状态的命令
Cypress.Commands.add('checkErrorState', (errorMessage: string) => {
  cy.getByTestId('error-message')
    .should('be.visible')
    .and('contain', errorMessage);
});

// 添加检查分数显示的命令
Cypress.Commands.add('checkScore', (selector: string, expectedScore: number) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain', expectedScore);
});

// 添加检查标签显示的命令
Cypress.Commands.add('checkLabel', (selector: string, expectedLabel: string) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain', expectedLabel);
});

// 添加检查部分可见性的命令
Cypress.Commands.add('checkSectionVisibility', (sectionId: string) => {
  cy.getByTestId(sectionId)
    .should('be.visible')
    .and('have.length', 1);
});

// 添加检查动画效果的命令
Cypress.Commands.add('checkAnimation', (selector: string) => {
  cy.get(selector)
    .should('have.css', 'transition')
    .and('not.be.empty');
});

// 添加检查响应式布局的命令
Cypress.Commands.add('checkResponsiveLayout', (selector: string) => {
  // 检查移动端布局
  cy.viewport('iphone-6');
  cy.get(selector).should('be.visible');

  // 检查平板布局
  cy.viewport('ipad-2');
  cy.get(selector).should('be.visible');

  // 检查桌面布局
  cy.viewport(1280, 720);
  cy.get(selector).should('be.visible');
}); 