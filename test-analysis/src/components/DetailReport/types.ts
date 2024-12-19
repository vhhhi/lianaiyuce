// 维度评分
export interface TestDimensions {
  personality: number;
  values: number;
  lifestyle: number;
  interests: number;
  future: number;
}

// 测试结果概览
export interface TestResultOverview {
  overallScore: number;
  dimensions: TestDimensions;
  completedAt: string;
  version: string;
}

// 大五人格数据
export interface BigFiveData {
  openness: number;        // 开放性
  conscientiousness: number; // 尽责性  
  extraversion: number;    // 外向性
  agreeableness: number;   // 宜人性
  neuroticism: number;     // 神经质
}

// 性格分析数据
export interface PersonalityData {
  bigFive: BigFiveData;
  strengths: string[];      // 性格优势
  risks: string[];         // 潜在风险
}

// 情感倾向数据
export interface EmotionalData {
  cognitionPattern: string;   // 情感认知模式
  expressionStyle: string;    // 表达方式
  needs: string[];           // 情感需求
}

// 关系模式数据
export interface RelationshipData {
  attachmentStyle: string;    // 依恋类型
  communicationStyle: string; // 沟通方式
  expectations: string[];     // 关系期待
}

// 建议数据
export interface SuggestionsData {
  personalGrowth: string[];   // 个人成长建议
  relationshipTips: string[]; // 关系维护建议
  preventions: string[];      // 问题预防建议
}

// 完整测试结果
export interface TestResultData {
  overview: TestResultOverview;
  personality: PersonalityData;
  emotional: EmotionalData;
  relationship: RelationshipData;
  suggestions: SuggestionsData;
}

// 组件Props类型
export interface DetailReportProps {
  data: TestResultData;
}
