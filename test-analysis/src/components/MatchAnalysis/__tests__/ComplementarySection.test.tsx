import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import { ComplementarySection } from '../ComplementarySection';

const mockData = {
  strengths: [
    '性格互补,能够相互促进',
    '价值观契合度高',
    '生活习惯相似'
  ],
  challenges: [
    '沟通方式存在差异',
    '对未来规划有不同看法',
    '兴趣爱好重叠较少'
  ]
};

describe('ComplementarySection', () => {
  it('renders strengths and challenges', () => {
    render(<ComplementarySection data={mockData} />);

    // 检查标题
    expect(screen.getByText('互补优势')).toBeInTheDocument();
    expect(screen.getByText('互补挑战')).toBeInTheDocument();

    // 检查内容
    mockData.strengths.forEach(strength => {
      expect(screen.getByText(strength)).toBeInTheDocument();
    });

    mockData.challenges.forEach(challenge => {
      expect(screen.getByText(challenge)).toBeInTheDocument();
    });
  });

  it('handles empty data', () => {
    render(
      <ComplementarySection
        data={{ strengths: [], challenges: [] }}
      />
    );

    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<ComplementarySection data={mockData} loading={true} />);
    expect(screen.getByTestId('complementary-loading')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ComplementarySection data={mockData} />);
    expect(container).toMatchSnapshot();
  });
}); 