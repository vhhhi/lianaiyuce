import React from 'react';
import { render, act } from '@testing-library/react';
import { DetailReport } from '../index';
import { TestResultData } from '../types';
import { ReportProvider } from '../../../contexts/ReportContext';
import { performanceMonitor } from '../../../utils/performance';

// 使用与单元测试相同的模拟数据
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
    logComponentMetrics: jest.fn(),
    getPageLoadMetrics: jest.fn()
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

describe('DetailReport Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 清除性能标记
    performance.clearMarks();
    performance.clearMeasures();
  });

  it('measures initial render time', async () => {
    performance.mark('renderStart');

    await act(async () => {
      render(
        <ReportProvider>
          <DetailReport data={mockTestData} />
        </ReportProvider>
      );
    });

    performance.mark('renderEnd');
    performance.measure('renderTime', 'renderStart', 'renderEnd');

    const measurements = performance.getEntriesByName('renderTime');
    expect(measurements.length).toBe(1);
    expect(measurements[0].duration).toBeLessThan(1000); // 渲染时间应小于1秒
  });

  it('measures component load times', async () => {
    const componentLoadTimes: { [key: string]: number } = {};

    // 监听组件加载时间
    const originalLogMetrics = performanceMonitor.logComponentMetrics;
    (performanceMonitor.logComponentMetrics as jest.Mock).mockImplementation(
      (metrics: any) => {
        componentLoadTimes[metrics.componentName] = metrics.loadTime;
        originalLogMetrics(metrics);
      }
    );

    await act(async () => {
      render(
        <ReportProvider>
          <DetailReport data={mockTestData} />
        </ReportProvider>
      );
    });

    // 验证各个组件的加载时间
    expect(componentLoadTimes['ResultOverview']).toBeDefined();
    expect(componentLoadTimes['PersonalityAnalysis']).toBeDefined();
    expect(componentLoadTimes['EmotionalTendency']).toBeDefined();
    expect(componentLoadTimes['RelationshipStyle']).toBeDefined();
    expect(componentLoadTimes['GrowthSuggestions']).toBeDefined();

    // 验证加载时间是否在合理范围内
    Object.values(componentLoadTimes).forEach(time => {
      expect(time).toBeLessThan(500); // 每个组件加载时间应小于500ms
    });
  });

  it('measures memory usage', async () => {
    if ('memory' in performance) {
      const beforeMemory = (performance as any).memory.usedJSHeapSize;

      await act(async () => {
        render(
          <ReportProvider>
            <DetailReport data={mockTestData} />
          </ReportProvider>
        );
      });

      const afterMemory = (performance as any).memory.usedJSHeapSize;
      const memoryIncrease = afterMemory - beforeMemory;

      // 内存增加不应超过50MB
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    } else {
      console.log('Memory API not available in this environment');
    }
  });

  it('measures rerender performance', async () => {
    let component: any;

    await act(async () => {
      component = render(
        <ReportProvider>
          <DetailReport data={mockTestData} />
        </ReportProvider>
      );
    });

    performance.mark('rerenderStart');

    await act(async () => {
      component.rerender(
        <ReportProvider>
          <DetailReport data={mockTestData} />
        </ReportProvider>
      );
    });

    performance.mark('rerenderEnd');
    performance.measure('rerenderTime', 'rerenderStart', 'rerenderEnd');

    const measurements = performance.getEntriesByName('rerenderTime');
    expect(measurements.length).toBe(1);
    expect(measurements[0].duration).toBeLessThan(500); // 重渲染时间应小于500ms
  });
}); 