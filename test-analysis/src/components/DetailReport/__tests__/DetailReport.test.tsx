import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailReport } from '../index';
import { TestResultData } from '../types';
import { ReportProvider } from '../../../contexts/ReportContext';

// 模拟数据
const mockTestData: TestResultData = {
  overview: {
    id: 'test-123',
    overallScore: 85,
    dimensions: {
      personality: 88,
      values: 82,
      lifestyle: 85,
      interests: 90,
      future: 80
    },
    completedAt: '2024-03-20T15:30:00Z',
    version: '1.0.0'
  },
  personality: {
    bigFive: {
      openness: 75,
      conscientiousness: 82,
      extraversion: 68,
      agreeableness: 88,
      neuroticism: 45
    },
    strengths: ['善于倾听', '富有同理心', '情绪稳定'],
    risks: ['过分理想化', '容易优柔寡断']
  },
  emotional: {
    cognitionPattern: '理性分析型',
    expressionStyle: '委婉含蓄型',
    needs: [
      '需要稳定的情感依托',
      '渴望被理解和认可',
      '追求精神层面的契合'
    ]
  },
  relationship: {
    attachmentStyle: '安全型',
    communicationStyle: '直接型',
    expectations: [
      '建立稳定的情感连接',
      '保持良好的沟通',
      '共同成长'
    ]
  },
  suggestions: {
    personalGrowth: [
      '培养决断力',
      '提高行动效率',
      '保持开放心态'
    ],
    relationshipTips: [
      '主动创造共处时光',
      '保持良性沟通',
      '尊重对方空间'
    ],
    preventions: [
      '避免过分理想化',
      '克服优柔寡断',
      '防止情绪压抑'
    ]
  }
};

// 模拟性能监控
jest.mock('../../../utils/performance', () => ({
  withPerformanceMonitoring: (component: any) => component,
  performanceMonitor: {
    logComponentMetrics: jest.fn()
  }
}));

// 模拟预加载管理器
jest.mock('../../../utils/preload', () => ({
  preloadManager: {
    preloadComponent: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn()
  },
  usePreload: () => {}
}));

describe('DetailReport Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is not provided', () => {
    render(
      <ReportProvider>
        <DetailReport data={null} />
      </ReportProvider>
    );

    expect(screen.getByText('数据加载失败')).toBeInTheDocument();
    expect(screen.getByText('无法获取测试报告数据，请稍后重试。')).toBeInTheDocument();
  });

  it('renders all sections when data is provided', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    // 等待所有组件加载完成
    await waitFor(() => {
      expect(screen.getByText('总体评分')).toBeInTheDocument();
    });

    // 验证各个部分是否渲染
    expect(screen.getByText('大五人格分析')).toBeInTheDocument();
    expect(screen.getByText('情感认知模式')).toBeInTheDocument();
    expect(screen.getByText('依恋类型')).toBeInTheDocument();
    expect(screen.getByText('个人成长建议')).toBeInTheDocument();
  });

  it('displays correct overview data', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('85')).toBeInTheDocument();
      expect(screen.getByText('/100')).toBeInTheDocument();
    });
  });

  it('handles personality analysis section correctly', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('开放性')).toBeInTheDocument();
      expect(screen.getByText('善于倾听')).toBeInTheDocument();
    });
  });

  it('handles emotional tendency section correctly', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('理性分析型')).toBeInTheDocument();
      expect(screen.getByText('需要稳定的情感依托')).toBeInTheDocument();
    });
  });

  it('handles relationship style section correctly', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('安全型')).toBeInTheDocument();
      expect(screen.getByText('建立稳定的情感连接')).toBeInTheDocument();
    });
  });

  it('handles growth suggestions section correctly', async () => {
    render(
      <ReportProvider>
        <DetailReport data={mockTestData} />
      </ReportProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('培养决断力')).toBeInTheDocument();
      expect(screen.getByText('主动创造共处时光')).toBeInTheDocument();
    });
  });
}); 