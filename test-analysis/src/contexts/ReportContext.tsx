import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { TestResultData } from '../components/DetailReport/types';
import { fetchTestReport } from '../services/api';
import { cacheData, getCachedData } from '../utils/cache';

interface ReportState {
  loading: boolean;
  error: Error | null;
  testResult: TestResultData | null;
  partnerResult: TestResultData | null;
  matchAnalysis: any | null; // 匹配分析结果类型待定
}

type ReportAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { testResult: TestResultData; partnerResult?: TestResultData; matchAnalysis?: any } }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'CLEAR_ERROR' };

interface ReportContextValue {
  state: ReportState;
  fetchReport: (id: string) => Promise<void>;
  clearError: () => void;
}

const initialState: ReportState = {
  loading: false,
  error: null,
  testResult: null,
  partnerResult: null,
  matchAnalysis: null
};

const reportReducer = (state: ReportState, action: ReportAction): ReportState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        testResult: action.payload.testResult,
        partnerResult: action.payload.partnerResult || null,
        matchAnalysis: action.payload.matchAnalysis || null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, initialState);

  const fetchReport = useCallback(async (id: string) => {
    try {
      // 先尝试从缓存获取数据
      const cachedData = getCachedData(id);
      if (cachedData) {
        dispatch({ type: 'FETCH_SUCCESS', payload: cachedData });
        return;
      }

      dispatch({ type: 'FETCH_START' });
      const data = await fetchTestReport(id);
      
      // 缓存数据
      cacheData(id, data);
      
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error as Error });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    state,
    fetchReport,
    clearError
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}; 