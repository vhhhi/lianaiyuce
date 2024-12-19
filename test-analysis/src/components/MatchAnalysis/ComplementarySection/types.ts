interface ComplementaryData {
  strengths: string[];    // 互补优势
  challenges: string[];   // 互补挑战
}

export interface ComplementarySectionProps {
  data: ComplementaryData;
  loading?: boolean;
} 