import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import { MatchScoreSection } from '../MatchScoreSection';

const mockData = {
  overallMatch: 85,
  dimensions: {
    personality: 80,
    values: 85,
    lifestyle: 90,
    interests: 75,
    future: 95
  }
};

const mockSelfResult = {
  dimensions: {
    personality: 75,
    values: 80,
    lifestyle: 85,
    interests: 70,
    future: 90
  }
};

const mockPartnerResult = {
  dimensions: {
    personality: 85,
    values: 90,
    lifestyle: 95,
    interests: 80,
    future: 100
  }
};

describe('MatchScoreSection', () => {
  it('renders correctly', () => {
    render(
      <MatchScoreSection
        data={mockData}
        selfResult={mockSelfResult}
        partnerResult={mockPartnerResult}
      />
    );

    // 检查总体匹配度
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('总体匹配度')).toBeInTheDocument();

    // 检查维度标题
    expect(screen.getByText('维度匹配分析')).toBeInTheDocument();
    expect(screen.getByText('维度详细对比')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(
      <MatchScoreSection
        data={mockData}
        selfResult={mockSelfResult}
        partnerResult={mockPartnerResult}
        loading={true}
      />
    );

    // 检查加载状态
    expect(screen.getByTestId('match-score-loading')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MatchScoreSection
        data={mockData}
        selfResult={mockSelfResult}
        partnerResult={mockPartnerResult}
      />
    );

    expect(container).toMatchSnapshot();
  });
}); 