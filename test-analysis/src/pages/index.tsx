import React from 'react';
import { ResultOverview } from '../../components/ResultOverview';
import { TestResult } from '../../components/ResultOverview/types';

// 模拟测试数据
const mockResult: TestResult = {
  overallScore: 85,
  dimensions: {
    personality: 88,
    values: 82,
    lifestyle: 85,
    interests: 90,
    future: 80
  },
  completedAt: '2024-03-20 15:30:00',
  version: '1.0.0'
};

export const TestReport: React.FC = () => {
  // 模拟刷新功能
  const handleRefresh = () => {
    console.log('刷新数据');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 24px' }}>
      <ResultOverview 
        result={mockResult}
        onRefresh={handleRefresh}
      />
    </div>
  );
};
