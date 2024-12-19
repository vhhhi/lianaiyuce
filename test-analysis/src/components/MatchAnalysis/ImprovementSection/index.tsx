import React from 'react';
import { Timeline, Card } from 'antd';
import { 
  RocketOutlined,
  NodeIndexOutlined,
  FlagOutlined
} from '@ant-design/icons';
import { ImprovementSectionProps } from './types';
import styles from './styles.module.css';

// 阶段配置
const stages = {
  shortTerm: {
    title: '短期目标',
    icon: <RocketOutlined />,
    color: '#4299e1',
    description: '近期可以着手实施的改善措施'
  },
  midTerm: {
    title: '中期目标',
    icon: <NodeIndexOutlined />,
    color: '#48bb78',
    description: '需要持续投入的改善方向'
  },
  longTerm: {
    title: '长期目标',
    icon: <FlagOutlined />,
    color: '#805ad5',
    description: '需要长期坚持的发展规划'
  }
};

export const ImprovementSection: React.FC<ImprovementSectionProps> = ({
  data,
  loading = false
}) => {
  return (
    <div className={styles.container}>
      <Timeline mode="alternate">
        {Object.entries(stages).map(([key, config]) => (
          <Timeline.Item
            key={key}
            dot={
              <div 
                className={styles.timelineDot}
                style={{ background: config.color }}
              >
                {config.icon}
              </div>
            }
            color={config.color}
          >
            <Card
              title={
                <div className={styles.cardTitle}>
                  <span>{config.title}</span>
                  <span className={styles.description}>
                    {config.description}
                  </span>
                </div>
              }
              className={styles.card}
              loading={loading}
              style={{ borderTop: `3px solid ${config.color}` }}
            >
              <ul className={styles.suggestionList}>
                {data[key as keyof ImprovementData].map((item, index) => (
                  <li key={index} className={styles.suggestionItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}; 