import React from 'react';
import { Card, Row, Col, List, Typography } from 'antd';
import { 
  RocketOutlined,
  HeartOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { SuggestionsSectionProps } from './types';
import styles from './styles.module.css';

const { Title, Text } = Typography;

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
  <Card className={styles.card}>
    <div className={styles.cardHeader} style={{ color }}>
      {icon}
      <Title level={4}>{title}</Title>
    </div>
    <List
      dataSource={items}
      renderItem={item => (
        <List.Item className={styles.listItem}>
          <Text>{item}</Text>
        </List.Item>
      )}
    />
  </Card>
);

export const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({ data }) => {
  const suggestions = [
    {
      title: '个人成长建议',
      icon: <RocketOutlined className={styles.icon} />,
      items: data.personalGrowth,
      color: '#4299e1' // 蓝色
    },
    {
      title: '关系维护建议',
      icon: <HeartOutlined className={styles.icon} />,
      items: data.relationshipTips,
      color: '#ed64a6' // 粉色
    },
    {
      title: '问题预防建议',
      icon: <SafetyOutlined className={styles.icon} />,
      items: data.preventions,
      color: '#48bb78' // 绿色
    }
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {suggestions.map(suggestion => (
          <Col xs={24} md={8} key={suggestion.title}>
            <SuggestionCard {...suggestion} />
          </Col>
        ))}
      </Row>
    </div>
  );
}; 