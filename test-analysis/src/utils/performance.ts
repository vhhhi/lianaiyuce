import { ReportHandler } from 'web-vitals';
import React from 'react';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in navigator['connection']
    ? (navigator['connection'] as any)['effectiveType']
    : '';
}

export function sendToAnalytics(metric: any, options: { path: string }) {
  const page = Object.entries(options).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  );

  const body = {
    dsn: process.env.REACT_APP_ANALYTICS_ID, // 你的Analytics ID
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  if (process.env.NODE_ENV === 'production') {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob);
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'omit',
        keepalive: true,
      });
    }
  }
}

export function reportWebVitals(onPerfEntry?: ReportHandler) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

interface PerformanceMetrics {
  FCP: number;      // First Contentful Paint
  LCP: number;      // Largest Contentful Paint
  FID: number;      // First Input Delay
  CLS: number;      // Cumulative Layout Shift
  TTI: number;      // Time to Interactive
  loadTime: number; // 页面加载时间
}

interface ComponentMetrics {
  componentName: string;
  renderTime: number;
  loadTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metricsQueue: ComponentMetrics[] = [];
  private readonly flushThreshold = 10;
  private readonly analyticsEndpoint = process.env.REACT_APP_ANALYTICS_ENDPOINT;

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers() {
    // 观察页面核心性能指标
    if ('PerformanceObserver' in window) {
      // FCP观察器
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fcp = entries[0];
          this.logCoreWebVital('FCP', fcp.startTime);
        }
      }).observe({ entryTypes: ['paint'] });

      // LCP观察器
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcp = entries[entries.length - 1];
          this.logCoreWebVital('LCP', lcp.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID观察器
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fid = entries[0];
          this.logCoreWebVital('FID', fid.duration);
        }
      }).observe({ entryTypes: ['first-input'] });

      // CLS观察器
      new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.logCoreWebVital('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  private logCoreWebVital(metric: keyof PerformanceMetrics, value: number) {
    console.log(`Core Web Vital - ${metric}:`, value);
    // 可以在这里将数据发送到分析服务
  }

  // 记录组件性能指标
  logComponentMetrics(metrics: Omit<ComponentMetrics, 'timestamp'>) {
    this.metricsQueue.push({
      ...metrics,
      timestamp: Date.now()
    });

    if (this.metricsQueue.length >= this.flushThreshold) {
      this.flushMetrics();
    }
  }

  // 批量发送性能数据
  private async flushMetrics() {
    if (!this.analyticsEndpoint || this.metricsQueue.length === 0) return;

    const metrics = [...this.metricsQueue];
    this.metricsQueue = [];

    try {
      await fetch(this.analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        }),
        keepalive: true
      });
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
      // 失败时将数据重新加入队列
      this.metricsQueue.unshift(...metrics);
    }
  }

  // 获取页面加载性能数据
  getPageLoadMetrics(): Partial<PerformanceMetrics> {
    const timing = performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      TTI: timing.domInteractive - timing.navigationStart
    };
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// HOC用于监控组件性能
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const WithPerformanceMonitoring: React.FC<P> = (props) => {
    const startTime = performance.now();

    React.useEffect(() => {
      const loadTime = performance.now() - startTime;
      performanceMonitor.logComponentMetrics({
        componentName,
        renderTime: loadTime,
        loadTime
      });
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  WithPerformanceMonitoring.displayName = `WithPerformanceMonitoring(${componentName})`;
  return WithPerformanceMonitoring;
} 