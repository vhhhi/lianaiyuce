declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
    REACT_APP_CACHE_PREFIX: string;
    REACT_APP_CACHE_MAX_AGE: string;
    REACT_APP_CACHE_MAX_SIZE: string;
  }
} 