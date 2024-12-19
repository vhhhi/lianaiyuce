import React, { ComponentType, useEffect } from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  loadTime: number;
  interactionTime?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];

  logComponentMetrics(metrics: PerformanceMetrics) {
    this.metrics.push(metrics);
    console.log(`Performance metrics for ${metrics.componentName}:`, metrics);
  }

  getComponentMetrics(componentName: string): PerformanceMetrics | undefined {
    return this.metrics.find(m => m.componentName === componentName);
  }

  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  clearMetrics() {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName: string
): React.FC<P> {
  return function PerformanceMonitoredComponent(props: P) {
    useEffect(() => {
      const startTime = performance.now();
      
      // 记录组件加载时间
      const loadTime = performance.now() - startTime;
      
      performanceMonitor.logComponentMetrics({
        componentName,
        renderTime: 0, // 初始渲染时间
        loadTime,
      });

      return () => {
        // 清理工作
      };
    }, []);

    // 使用 React.createElement 而不是 JSX
    return React.createElement(WrappedComponent, props);
  };
} 