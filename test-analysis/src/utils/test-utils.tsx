import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ReportProvider } from '../contexts/ReportContext';

function render(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(
    <ConfigProvider locale={zhCN}>
      <ReportProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ReportProvider>
    </ConfigProvider>
  );
}

// 重新导出所有testing-library的工具
export * from '@testing-library/react';
export { render }; 