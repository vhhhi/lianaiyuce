import React from 'react';
import { Card } from 'antd';
import { 
  MatchScoreSection,
  StrengthWeaknessSection,
  SuggestionSection 
} from '../../components/MatchAnalysis';
import styles from './index.module.css';

// 模拟数据
const mockData = {
  matchScore: {
    totalScore: 85,
    scores: [
      {
        dimension: '性格匹配',
        score: 88,
        description: '你们的性格特征高度互补,能够很好地理解和包容对方。'
      },
      {
        dimension: '价值观',
        score: 92,
        description: '在人生价值和重要事项上有着高度的共识。'
      },
      {
        dimension: '生活习惯',
        score: 75,
        description: '生活习惯存在一些差异,但不影响整体和谐。'
      },
      {
        dimension: '兴趣爱好',
        score: 82,
        description: '有许多共同的兴趣爱好,易于共处。'
      },
      {
        dimension: '未来规划',
        score: 85,
        description: '对未来的规划和期望基本一致。'
      }
    ]
  },
  analysis: {
    strengths: [
      {
        title: '高度的情感共鸣',
        description: '你们能够准确理解对方的情感需求,并给予适当的回应。'
      },
      {
        title: '共同的价值观',
        description: '在重要的人生议题上持有相似的看法,这为关系提供了稳固的基础。'
      },
      {
        title: '良好的沟通方式',
        description: '善于倾听和表达,能够有效地解决分歧。'
      }
    ],
    weaknesses: [
      {
        title: '生活习惯差异',
        description: '在日常生活中可能因习惯不同产生一些小摩擦。'
      },
      {
        title: '压力应对方式',
        description: '在面对压力时的反应方式存在差异,需要更多理解和包容。'
      },
      {
        title: '社交圈子融合',
        description: '各自的社交圈重叠较少,可能影响共同活动的开展。'
      }
    ]
  },
  suggestions: [
    {
      title: '建立共同的生活规划',
      content: '一起制定日常生活规划,逐步调整彼此的生活习惯,找到平衡点。',
      priority: 'high'
    },
    {
      title: '增加共同活动',
      content: '多参与对方感兴趣的活动,培养新的共同爱好。',
      priority: 'medium'
    },
    {
      title: '加强社交圈融合',
      content: '适当安排双方朋友聚会,增进社交圈的交融。',
      priority: 'low'
    }
  ]
};

const TestAnalysis: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card title="测试分析报告" className={styles.card}>
        {/* 匹配度分析部分 */}
        <section className={styles.section}>
          <MatchScoreSection
            totalScore={mockData.matchScore.totalScore}
            scores={mockData.matchScore.scores}
          />
        </section>

        {/* 优势劣势分析部分 */}
        <section className={styles.section}>
          <StrengthWeaknessSection
            strengths={mockData.analysis.strengths}
            weaknesses={mockData.analysis.weaknesses}
          />
        </section>

        {/* 改善建议部分 */}
        <section className={styles.section}>
          <SuggestionSection suggestions={mockData.suggestions} />
        </section>
      </Card>
    </div>
  );
};

export default TestAnalysis; 