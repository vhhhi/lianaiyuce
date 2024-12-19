import React, { Suspense, lazy, useRef, useEffect } from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { DetailReportProps } from './types';
import { withPerformanceMonitoring } from '../../utils/performance';
import { preloadManager, usePreload } from '../../utils/preload';
import styles from './styles.module.css';

// 懒加载子组件
const ResultOverview = lazy(() => import('./ResultOverview').then(
  module => ({ default: withPerformanceMonitoring(module.default, 'ResultOverview') })
));

const PersonalityAnalysis = lazy(() => import('./PersonalityAnalysis').then(
  module => ({ default: withPerformanceMonitoring(module.default, 'PersonalityAnalysis') })
));

const EmotionalTendency = lazy(() => import('./EmotionalTendency').then(
  module => ({ default: withPerformanceMonitoring(module.default, 'EmotionalTendency') })
));

const RelationshipStyle = lazy(() => import('./RelationshipStyle').then(
  module => ({ default: withPerformanceMonitoring(module.default, 'RelationshipStyle') })
));

const GrowthSuggestions = lazy(() => import('./GrowthSuggestions').then(
  module => ({ default: withPerformanceMonitoring(module.default, 'GrowthSuggestions') })
));

// 预加载所有组件
const preloadComponents = () => {
  preloadManager.preloadComponent(() => import('./ResultOverview'));
  preloadManager.preloadComponent(() => import('./PersonalityAnalysis'));
  preloadManager.preloadComponent(() => import('./EmotionalTendency'));
  preloadManager.preloadComponent(() => import('./RelationshipStyle'));
  preloadManager.preloadComponent(() => import('./GrowthSuggestions'));
};

// 加载中的占位组件
const LoadingComponent: React.FC = () => (
  <div className={styles.loadingContainer}>
    <Spin size="large" tip="加载中..." />
  </div>
);

const DetailReportComponent: React.FC<DetailReportProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reportId = data?.overview?.id;

  // 使用预加载 Hook
  usePreload(reportId || '', containerRef);

  // 初始化时预加载所有组件
  useEffect(() => {
    preloadComponents();
  }, []);

  if (!data) {
    return (
      <div className={styles.errorContainer}>
        <Alert
          type="error"
          message="数据加载失败"
          description="无法获取测试报告数据，请稍后重试。"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <Row gutter={[0, 24]}>
        {/* 测试结果概览 */}
        <Col span={24}>
          <Suspense fallback={<LoadingComponent />}>
            <ResultOverview data={data.overview} />
          </Suspense>
        </Col>

        {/* 性格特征分析 */}
        <Col span={24}>
          <Suspense fallback={<LoadingComponent />}>
            <PersonalityAnalysis data={data.personality} />
          </Suspense>
        </Col>

        {/* 情感倾向分析 */}
        <Col span={24}>
          <Suspense fallback={<LoadingComponent />}>
            <EmotionalTendency data={data.emotional} />
          </Suspense>
        </Col>

        {/* 关系模式分析 */}
        <Col span={24}>
          <Suspense fallback={<LoadingComponent />}>
            <RelationshipStyle data={data.relationship} />
          </Suspense>
        </Col>

        {/* 成长建议 */}
        <Col span={24}>
          <Suspense fallback={<LoadingComponent />}>
            <GrowthSuggestions data={data.suggestions} />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
};

// 为主组件添加性能监控
export const DetailReport = withPerformanceMonitoring(DetailReportComponent, 'DetailReport');
