describe('Test Report Page', () => {
  beforeEach(() => {
    cy.visit('/report/latest');
  });

  it('displays report sections', () => {
    // 检查页面标题
    cy.get('h1').should('contain', '测评报告');

    // 检查主要部分
    cy.getByTestId('match-score-section').should('be.visible');
    cy.getByTestId('complementary-section').should('be.visible');
    cy.getByTestId('issues-section').should('be.visible');
    cy.getByTestId('improvement-section').should('be.visible');
  });

  it('handles loading state', () => {
    cy.intercept('GET', '/api/reports/*', (req) => {
      req.reply({
        delay: 1000,
        fixture: 'report.json'
      });
    });

    cy.visit('/report/1');
    cy.getByTestId('report-loading').should('be.visible');
    cy.getByTestId('match-score-section').should('be.visible');
  });

  it('handles error state', () => {
    cy.intercept('GET', '/api/reports/*', {
      statusCode: 500,
      body: { message: '服务器错误' }
    });

    cy.visit('/report/1');
    cy.getByTestId('error-message').should('be.visible');
    cy.contains('重试').click();
  });

  it('supports sharing report', () => {
    cy.getByTestId('share-button').click();
    cy.getByTestId('share-modal').should('be.visible');
    cy.getByTestId('copy-link').click();
    cy.contains('链接已复制').should('be.visible');
  });

  it('supports downloading PDF', () => {
    cy.getByTestId('download-button').click();
    cy.readFile('cypress/downloads/report.pdf').should('exist');
  });
}); 