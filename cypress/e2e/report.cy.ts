describe('测试报告页面 E2E 测试', () => {
  beforeEach(() => {
    // 访问测试报告页面
    cy.visit('/test-report');
    
    // 模拟 API 响应
    cy.intercept('GET', '/api/test-result/*', {
      fixture: 'testResult.json'
    }).as('getTestResult');
  });

  it('应该正确加载和显示测试报告页面', () => {
    // 等待 API 响应和页面加载
    cy.wait('@getTestResult');
    cy.waitForPageLoad();

    // 验证页面标题和总体评分
    cy.getByTestId('report-title')
      .should('be.visible')
      .and('contain', '测试报告');

    cy.checkScore('[data-testid="overall-score"]', 85);
    cy.checkChartRendering('[data-testid="radar-chart"]');
  });

  it('应该正确显示人格分析部分', () => {
    cy.wait('@getTestResult');

    // 验证人格分析部分
    cy.checkSectionVisibility('personality-section');
    cy.checkChartRendering('[data-testid="big-five-chart"]');
    cy.checkListItems('[data-testid="strengths-list"]', 3);

    // 验证标签显示
    cy.checkLabel('[data-testid="personality-title"]', '大五人格分析');
  });

  it('应该正确显示情感倾向部分', () => {
    cy.wait('@getTestResult');

    // 验证情感倾向部分
    cy.checkSectionVisibility('emotional-section');
    cy.getByTestId('cognition-pattern')
      .should('contain', '理性分析型');
    cy.getByTestId('expression-style')
      .should('contain', '委婉含蓄型');
  });

  it('应该正确显示关系风格部分', () => {
    cy.wait('@getTestResult');

    // 验证关系风格部分
    cy.checkSectionVisibility('relationship-section');
    cy.getByTestId('attachment-style')
      .should('contain', '安全型');
    cy.getByTestId('communication-style')
      .should('contain', '直接型');
  });

  it('应该正确显示成长建议部分', () => {
    cy.wait('@getTestResult');

    // 验证成长建议部分
    cy.checkSectionVisibility('suggestions-section');
    cy.checkListItems('[data-testid="personal-growth"]', 3);
    cy.checkListItems('[data-testid="relationship-tips"]', 3);
  });

  it('应该正确处理加载状态', () => {
    // 延迟 API 响应
    cy.intercept('GET', '/api/test-result/*', {
      delay: 1000,
      fixture: 'testResult.json'
    }).as('delayedTestResult');

    cy.visit('/test-report');
    cy.checkLoadingState();
  });

  it('应该正确处理错误状态', () => {
    // 模拟 API 错误
    cy.intercept('GET', '/api/test-result/*', {
      statusCode: 500,
      body: { error: '服务器错误' }
    }).as('errorTestResult');

    cy.visit('/test-report');
    cy.wait('@errorTestResult');
    cy.checkErrorState('无法获取测试报告数据');
  });

  it('应该正确处理性能监控', () => {
    cy.wait('@getTestResult');
    cy.checkPerformanceMetrics();
  });

  it('应该正确处理响应式布局', () => {
    cy.wait('@getTestResult');
    
    // 检查主要部分的响应式布局
    cy.checkResponsiveLayout('[data-testid="report-container"]');
    cy.checkResponsiveLayout('[data-testid="personality-section"]');
    cy.checkResponsiveLayout('[data-testid="emotional-section"]');
    cy.checkResponsiveLayout('[data-testid="relationship-section"]');
    cy.checkResponsiveLayout('[data-testid="suggestions-section"]');
  });

  it('应该正确处理动画效果', () => {
    cy.wait('@getTestResult');
    
    // 检查主要部分的动画效果
    cy.checkAnimation('[data-testid="radar-chart"]');
    cy.checkAnimation('[data-testid="big-five-chart"]');
    cy.checkAnimation('[data-testid="suggestions-section"]');
  });
}); 