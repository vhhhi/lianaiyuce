import React from 'react';
import { Card, Timeline } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface Suggestion {
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionSectionProps {
  suggestions: Suggestion[];
}

const SuggestionSection: React.FC<SuggestionSectionProps> = ({ suggestions }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#f5222d';
      case 'medium':
        return '#faad14';
      case 'low':
        return '#52c41a';
      default:
        return '#1890ff';
    }
  };

  return (
    <Card
      title={
        <div className={styles.cardTitle}>
          <BulbOutlined className={styles.icon} />
          <span>改善建议</span>
        </div>
      }
    >
      <Timeline
        items={suggestions.map((suggestion, index) => ({
          color: getPriorityColor(suggestion.priority),
          children: (
            <div key={index} className={styles.suggestionItem}>
              <h4>{suggestion.title}</h4>
              <p>{suggestion.content}</p>
            </div>
          ),
        }))}
      />
    </Card>
  );
};

export default SuggestionSection; 