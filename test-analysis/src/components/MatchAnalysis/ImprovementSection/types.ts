interface ImprovementData {
  shortTerm: string[];   // 短期目标
  midTerm: string[];     // 中期目标
  longTerm: string[];    // 长期目标
}

export interface ImprovementSectionProps {
  data: ImprovementData;
  loading?: boolean;
} 