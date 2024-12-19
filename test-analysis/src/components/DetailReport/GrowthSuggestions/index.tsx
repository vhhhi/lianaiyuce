import React from 'react';
import { Card, Row, Col, List } from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  SafetyCertificateOutlined 
} from '@ant-design/icons';
import { SuggestionsData } from '../types';
import styles from './styles.module.css';

interface GrowthSuggestionsProps {
  data: SuggestionsData;
}

interface SuggestionCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  title,
  icon,
  items,
  color
}) => (
  <Card title={title} className={styles.card}>
    <div className={styles.cardHeader}>
      <span className={styles.icon} style={{ color }}>
        {icon}
      </span>
    </div>
    <List
      dataSource={items}
      renderItem={item => (
        <List.Item className={styles.listItem}>
          <div className={styles.suggestionItem}>
            <span className={styles.bullet} style={{ backgroundColor: color }} />
            <span className={styles.text}>{item}</span>
          </div>
        </List.Item>
      )}
    />
  </Card>
);

export const GrowthSuggestions: React.FC<GrowthSuggestionsProps> = ({ data }) => {
  const suggestions = [
    {
      title: '个人成长建议',
      icon: <UserOutlined />,
      items: data.personalGrowth,
      color: '#1890ff'
    },
    {
      title: '关系维护建议',
      icon: <HeartOutlined />,
      items: data.relationshipTips,
      color: '#52c41a'
    },
    {
      title: '问题预防建议',
      icon: <SafetyCertificateOutlined />,
      items: data.preventions,
      color: '#faad14'
    }
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {suggestions.map((suggestion, index) => (
          <Col key={index} xs={24} md={8}>
            <SuggestionCard {...suggestion} />
          </Col>
        ))}
      </Row>
    </div>
  );
}; 