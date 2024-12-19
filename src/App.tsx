import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import PersonalityTest from './pages/PersonalityTest';
import TestAnalysis from './pages/TestAnalysis';
import TestResult from './pages/TestResult';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#ed64a6',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/personality" element={<PersonalityTest />} />
          <Route path="/test/result" element={<TestResult />} />
          <Route path="/test-analysis" element={<TestAnalysis />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
