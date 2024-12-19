import { TestResultData } from '../components/DetailReport/types';
import { handleError } from '../utils/error';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const fetchTestReport = async (id: string): Promise<{
  testResult: TestResultData;
  partnerResult?: TestResultData;
  matchAnalysis?: any;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<{
      testResult: TestResultData;
      partnerResult?: TestResultData;
      matchAnalysis?: any;
    }> = await response.json();

    if (!result.success) {
      throw new Error(result.message || '获取测试报告失败');
    }

    return result.data;
  } catch (error) {
    throw handleError(error, '获取测试报告失败');
  }
}; 