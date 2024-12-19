import { fetchTestReport } from '../services/api';
import { cacheData, getCachedData } from './cache';

interface PreloadConfig {
  threshold?: number;
  rootMargin?: string;
}

class PreloadManager {
  private static instance: PreloadManager;
  private observer: IntersectionObserver | null = null;
  private preloadQueue: Set<string> = new Set();
  private isIdle = false;

  private constructor() {
    this.initIdleCallback();
  }

  static getInstance(): PreloadManager {
    if (!PreloadManager.instance) {
      PreloadManager.instance = new PreloadManager();
    }
    return PreloadManager.instance;
  }

  private initIdleCallback() {
    if ('requestIdleCallback' in window) {
      const checkIdle = () => {
        this.isIdle = true;
        this.processPreloadQueue();
        requestIdleCallback(checkIdle);
      };
      requestIdleCallback(checkIdle);
    }
  }

  // 初始化 Intersection Observer
  initIntersectionObserver(config: PreloadConfig = {}) {
    const { threshold = 0.1, rootMargin = '100px' } = config;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const reportId = target.dataset.reportId;
            if (reportId) {
              this.preloadData(reportId);
            }
          }
        });
      },
      { threshold, rootMargin }
    );
  }

  // 观察元素
  observe(element: HTMLElement) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  // 停止观察元素
  unobserve(element: HTMLElement) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  // 添加到预加载队列
  addToPreloadQueue(reportId: string) {
    if (!this.preloadQueue.has(reportId)) {
      this.preloadQueue.add(reportId);
      if (this.isIdle) {
        this.processPreloadQueue();
      }
    }
  }

  // 处理预加载队列
  private async processPreloadQueue() {
    if (this.preloadQueue.size === 0) return;

    for (const reportId of this.preloadQueue) {
      // 检查是否已经缓存
      if (!getCachedData(reportId)) {
        try {
          const data = await fetchTestReport(reportId);
          cacheData(reportId, data);
          console.log(`Preloaded data for report ${reportId}`);
        } catch (error) {
          console.warn(`Failed to preload data for report ${reportId}:`, error);
        }
      }
      this.preloadQueue.delete(reportId);
    }
  }

  // 预加载数据
  async preloadData(reportId: string) {
    // 如果浏览器空闲，直接加载；否则加入队列
    if (this.isIdle) {
      if (!getCachedData(reportId)) {
        try {
          const data = await fetchTestReport(reportId);
          cacheData(reportId, data);
          console.log(`Preloaded data for report ${reportId}`);
        } catch (error) {
          console.warn(`Failed to preload data for report ${reportId}:`, error);
        }
      }
    } else {
      this.addToPreloadQueue(reportId);
    }
  }

  // 预加载组件
  preloadComponent(importFn: () => Promise<any>) {
    if (this.isIdle) {
      importFn().catch(error => {
        console.warn('Failed to preload component:', error);
      });
    }
  }
}

export const preloadManager = PreloadManager.getInstance();

// React Hook 用于预加载
export function usePreload(reportId: string, ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (ref.current) {
      ref.current.dataset.reportId = reportId;
      preloadManager.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        preloadManager.unobserve(ref.current);
      }
    };
  }, [reportId, ref]);
} 