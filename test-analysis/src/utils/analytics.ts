interface EventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

class Analytics {
  private static instance: Analytics;
  private readonly trackingId: string;
  private readonly debug: boolean;
  private queue: EventParams[] = [];
  private readonly batchSize = 10;
  private readonly reportUrl: string;

  private constructor() {
    this.trackingId = process.env.REACT_APP_ANALYTICS_ID || '';
    this.debug = process.env.NODE_ENV !== 'production';
    this.reportUrl = process.env.REACT_APP_ANALYTICS_URL || '';
    this.setupPageTracking();
    this.startReportTimer();
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private setupPageTracking() {
    // 监听路由变化
    window.addEventListener('popstate', this.trackPageView.bind(this));
    
    // 监听首次加载
    window.addEventListener('load', this.trackPageView.bind(this));
  }

  private trackPageView() {
    this.track({
      category: 'Page',
      action: 'View',
      label: window.location.pathname,
      title: document.title,
      url: window.location.href,
      referrer: document.referrer
    });
  }

  track(params: EventParams) {
    const event = {
      ...params,
      trackingId: this.trackingId,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };

    if (this.debug) {
      console.log('Analytics Event:', event);
    }

    this.queue.push(event);
    if (this.queue.length >= this.batchSize) {
      this.reportEvents();
    }
  }

  private startReportTimer() {
    setInterval(() => {
      if (this.queue.length > 0) {
        this.reportEvents();
      }
    }, 30000); // 每30秒上报一次
  }

  private async reportEvents() {
    if (!this.reportUrl || this.queue.length === 0) return;

    try {
      const events = [...this.queue];
      this.queue = [];

      await fetch(this.reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events,
          timestamp: Date.now()
        }),
        keepalive: true
      });
    } catch (error) {
      console.error('Analytics report failed:', error);
      // 报告失败时,将事件重新加入队列
      this.queue.push(...events);
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }
}

export const analytics = Analytics.getInstance(); 