import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';

// 懒加载页面组件
const TestReport = lazy(() => import('../pages/TestReport'));

// 预加载关键组件
const preloadTestReport = () => {
  const componentPromise = import('../pages/TestReport');
  return componentPromise;
};

// 在空闲时预加载
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => {
    preloadTestReport();
  });
} else {
  setTimeout(preloadTestReport, 1000);
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/report/:id" 
        element={
          <React.Suspense
            fallback={
              <LoadingState loading skeleton>
                <div style={{ height: '100vh' }} />
              </LoadingState>
            }
          >
            <TestReport />
          </React.Suspense>
        }
      />
      <Route 
        path="/" 
        element={<Navigate to="/report/latest" replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;
