import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import { ImprovementSection } from '../ImprovementSection';

const mockData = {
  shortTerm: [
    '增加共同活动时间',
    '提升沟通质量'
  ],
  midTerm: [
    '建立共同目标',
    '培养共同兴趣'
  ],
  longTerm: [
    '制定长期发展规划',
    '建立家庭价值观'
  ]
};

describe('ImprovementSection', () => {
  it('renders all improvement stages', () => {
    render(<ImprovementSection data={mockData} />);

    // 检查阶段标题
    expect(screen.getByText('短期目标')).toBeInTheDocument();
    expect(screen.getByText('中期目标')).toBeInTheDocument();
    expect(screen.getByText('长期目标')).toBeInTheDocument();

    // 检查建议内容
    mockData.shortTerm.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    mockData.midTerm.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    mockData.longTerm.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('handles empty data', () => {
    render(
      <ImprovementSection
        data={{
          shortTerm: [],
          midTerm: [],
          longTerm: []
        }}
      />
    );

    expect(screen.getAllByText('暂无建议').length).toBe(3);
  });

  it('handles loading state', () => {
    render(<ImprovementSection data={mockData} loading={true} />);
    expect(screen.getByTestId('improvement-loading')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ImprovementSection data={mockData} />);
    expect(container).toMatchSnapshot();
  });
}); 