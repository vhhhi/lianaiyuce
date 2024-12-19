import { TestResult } from '../../../ResultOverview/types';
import { MatchingAnalysis } from '../../types';

export interface DimensionCompareProps {
  selfData: TestResult['dimensions'];
  partnerData: TestResult['dimensions'];
  matchData: MatchingAnalysis['dimensions'];
  loading?: boolean;
} 