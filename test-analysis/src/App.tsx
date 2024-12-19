import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingState } from './components/LoadingState';
import { ReportProvider } from './contexts/ReportContext';
import { AppRoutes } from './routes';
import './App.css';

// 配置
const config = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
    timeout: 10000
  },
  cache: {
    prefix: 'test_analysis_',
    maxAge: 1000 * 60 * 60, // 1小时
    maxSize: 50
  }
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <ReportProvider>
          <BrowserRouter>
            <Suspense 
              fallback={
                <LoadingState loading skeleton>
                  <div style={{ height: '100vh' }} />
                </LoadingState>
              }
            >
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </ReportProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App; 