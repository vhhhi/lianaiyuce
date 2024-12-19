export interface RadarChartProps {
  data: {
    openness: number;        // 开放性
    conscientiousness: number; // 尽责性
    extraversion: number;    // 外向性
    agreeableness: number;   // 宜人性
    neuroticism: number;     // 神经质
  };
  loading?: boolean;
} 