import React from 'react';
import { Card, Tabs, Empty } from 'antd';
import { MatchScoreSection } from './MatchScoreSection';
import { ComplementarySection } from './ComplementarySection';
import { IssuesSection } from './IssuesSection';
import { ImprovementSection } from './ImprovementSection';
import { MatchAnalysisProps } from './types';
import styles from './styles.module.css';

const { TabPane } = Tabs;

// 模拟数据
const mockMatchData = {
  overallMatch: 85,
  dimensions: {
    personality: 82,
    values: 88,
    lifestyle: 78,
    interests: 90,
    future: 85
  },
  complementarity: {
    strengths: [
      '性格互补,能够相互促进',
      '兴趣爱好有重叠,也各有所长',
      '对未来规划有共同愿景'
    ],
    challenges: [
      '生活习惯存在差异',
      '沟通方式需要调整',
      '对某些价值观的理解不同'
    ]
  },
  potentialIssues: {
    personality: [
      '在决策方式上可能产生分歧',
      '情绪表达方式存在差异'
    ],
    lifestyle: [
      '作息时间不同步',
      '对生活品质的要求有差距'
    ],
    values: [
      '对家庭责任的理解存在差异',
      '对个人发展的优先级认知不同'
    ]
  },
  improvements: {
    shortTerm: [
      '建立共同的作息计划',
      '制定每周固定交流时间',
      '相互分享各自的兴趣爱好'
    ],
    midTerm: [
      '共同制定家庭发展规划',
      '建立有效的沟通机制',
      '培养共同的兴趣爱好'
    ],
    longTerm: [
      '定期回顾和调整发展目标',
      '建立长期的情感维护机制',
      '共同规划未来生活蓝图'
    ]
  }
};

export const MatchAnalysis: React.FC<MatchAnalysisProps> = ({
  result,
  partnerResult,
  matchData = mockMatchData,
  loading = false
}) => {
  // 如果没有伴侣数据,显示提示
  if (!partnerResult) {
    return (
      <Card className={styles.container}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无匹配数据,请先完成伴侣测评"
        />
      </Card>
    );
  }

  return (
    <Card 
      title="匹配分析报告" 
      className={styles.container}
      loading={loading}
    >
      <Tabs defaultActiveKey="score">
        <TabPane tab="匹配度分析" key="score">
          <MatchScoreSection 
            data={matchData}
            selfResult={result}
            partnerResult={partnerResult}
          />
        </TabPane>
        
        <TabPane tab="互补性分析" key="complementary">
          <ComplementarySection data={matchData.complementarity} />
        </TabPane>
        
        <TabPane tab="潜在问题" key="issues">
          <IssuesSection data={matchData.potentialIssues} />
        </TabPane>
        
        <TabPane tab="改善建议" key="improvement">
          <ImprovementSection data={matchData.improvements} />
        </TabPane>
      </Tabs>
    </Card>
  );
};
