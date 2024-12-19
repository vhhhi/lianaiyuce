import { TestResult } from '../ResultOverview/types';

// 匹配度分析结果
export interface MatchingAnalysis {
  // 总体匹配度
  overallMatch: number;
  
  // 各维度匹配度
  dimensions: {
    personality: number;    // 性格匹配度
    values: number;         // 价值观匹配度
    lifestyle: number;      // 生活方式匹配度
    interests: number;      // 兴趣爱好匹配度
    future: number;         // 未来规划匹配度
  };
  
  // 互补性分析
  complementarity: {
    strengths: string[];    // 互补优势
    challenges: string[];   // 互补挑战
  };
  
  // 潜在问题
  potentialIssues: {
    personality: string[];  // 性格冲突
    lifestyle: string[];    // 生活习惯差异
    values: string[];      // 价值观冲突
  };
  
  // 改善建议
  improvements: {
    shortTerm: string[];   // 短期目标
    midTerm: string[];     // 中期目标
    longTerm: string[];    // 长期目标
  };
}

// 组件Props
export interface MatchAnalysisProps {
  result: TestResult;
  partnerResult?: TestResult;
  matchData?: MatchingAnalysis;
  loading?: boolean;
}
