interface IssuesData {
  personality: string[];  // 性格冲突
  lifestyle: string[];    // 生活习惯差异
  values: string[];      // 价值观冲突
}

export interface IssuesSectionProps {
  data: IssuesData;
  loading?: boolean;
} 