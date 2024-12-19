import { MatchingAnalysis } from '../types';
import { TestResult } from '../../ResultOverview/types';

export interface MatchScoreSectionProps {
  data: MatchingAnalysis;
  selfResult: TestResult;
  partnerResult: TestResult;
  loading?: boolean;
} 