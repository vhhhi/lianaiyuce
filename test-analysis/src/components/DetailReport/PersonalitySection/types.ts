import { PersonalityAnalysis } from '../types';
import { TestResult } from '../../ResultOverview/types';

export interface PersonalitySectionProps {
  data: PersonalityAnalysis;
  dimensions: TestResult['dimensions'];
} 