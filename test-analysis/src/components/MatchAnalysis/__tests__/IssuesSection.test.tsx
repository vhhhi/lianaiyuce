import React from 'react';
import { render, screen, fireEvent } from '../../../utils/test-utils';
import { IssuesSection } from '../IssuesSection';

const mockData = {
  personality: [
    '性格倾向差异较大',
    '处理问题方式不同'
  ],
  lifestyle: [
    '作息时间不一致',
    '生活节奏差异明显'
  ],
  values: [
    '对家庭责任的理解不同',
    '对事业发展的看法存在分歧'
  ]
};

describe('IssuesSection', () => {
  it('renders all issue categories', () => {
    render(<IssuesSection data={mockData} />);

    // 检查类别标题
    expect(screen.getByText('性格冲突')).toBeInTheDocument();
    expect(screen.getByText('生活习惯差异')).toBeInTheDocument();
    expect(screen.getByText('价值观冲突')).toBeInTheDocument();
  });

  it('expands and collapses panels', () => {
    render(<IssuesSection data={mockData} />);

    // 默认展开第一个面板
    expect(screen.getByText('性格倾向差异较大')).toBeVisible();

    // 点击展开第二个面板
    fireEvent.click(screen.getByText('生活习惯差异'));
    expect(screen.getByText('作息时间不一致')).toBeVisible();

    // 再次点击收起面板
    fireEvent.click(screen.getByText('生活习惯差异'));
    expect(screen.queryByText('作息时间不一致')).not.toBeVisible();
  });

  it('handles empty data', () => {
    render(
      <IssuesSection
        data={{
          personality: [],
          lifestyle: [],
          values: []
        }}
      />
    );

    expect(screen.getAllByText('暂无数据').length).toBe(3);
  });

  it('handles loading state', () => {
    render(<IssuesSection data={mockData} loading={true} />);
    expect(screen.getByTestId('issues-loading')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<IssuesSection data={mockData} />);
    expect(container).toMatchSnapshot();
  });
}); 