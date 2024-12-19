// 导入 Cypress 命令
import './commands';

// 忽略未捕获的异常
Cypress.on('uncaught:exception', (err) => {
  // 返回 false 阻止 Cypress 失败测试
  return false;
});

// 添加自定义命令类型定义
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 等待页面加载完成
       */
      waitForPageLoad(): Chainable<Element>;
      
      /**
       * 等待指定元素可见
       */
      waitForElement(selector: string): Chainable<Element>;
      
      /**
       * 检查性能指标
       */
      checkPerformanceMetrics(): Chainable<Element>;
    }
  }
}

// 添加自定义命令实现
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve();
      } else {
        win.addEventListener('load', resolve);
      }
    });
  });
});

Cypress.Commands.add('waitForElement', (selector: string) => {
  return cy.get(selector, { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('checkPerformanceMetrics', () => {
  return cy.window().then((win) => {
    const metrics = win.performance.getEntriesByType('measure');
    expect(metrics.length).to.be.at.least(1);
    metrics.forEach((metric) => {
      expect(metric.duration).to.be.lessThan(3000); // 3秒阈值
    });
  });
}); 