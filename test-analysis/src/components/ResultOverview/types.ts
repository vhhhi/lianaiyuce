// 测试结果数据接口
export interface TestResult {
  // 总体匹配度分数 (0-100)
  overallScore: number;
  
  // 各维度得分
  dimensions: {
    personality: number;    // 性格维度
    values: number;         // 价值观维度
    lifestyle: number;      // 生活方式
    interests: number;      // 兴趣爱好
    future: number;         // 未来规划
  };
  
  // 测试完成时间
  completedAt: string;
  
  // 测试版本
  version: string;
}

// 组件Props接口
export interface ResultOverviewProps {
  // 测试结果数据
  result: TestResult;
  
  // 加载状态
  loading?: boolean;
  
  // 错误信息
  error?: string;
  
  // 刷新数据的回调函数
  onRefresh?: () => void;
}
