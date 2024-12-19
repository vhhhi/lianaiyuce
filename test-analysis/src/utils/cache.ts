const CACHE_PREFIX = 'love_match_report_';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30分钟缓存过期

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const cacheData = <T>(key: string, data: T): void => {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(
      `${CACHE_PREFIX}${key}`,
      JSON.stringify(cacheItem)
    );
  } catch (error) {
    console.warn('缓存数据失败:', error);
  }
};

export const getCachedData = <T>(key: string): T | null => {
  try {
    const cachedItem = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cachedItem) return null;

    const { data, timestamp }: CacheItem<T> = JSON.parse(cachedItem);
    
    // 检查缓存是否过期
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('获取缓存数据失败:', error);
    return null;
  }
};

export const clearCache = (key?: string): void => {
  try {
    if (key) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } else {
      // 清除所有相关缓存
      Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_PREFIX))
        .forEach(k => localStorage.removeItem(k));
    }
  } catch (error) {
    console.warn('清除缓存失败:', error);
  }
}; 