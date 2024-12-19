import React from 'react';
import { Card, Row, Col, Progress, List, Tag } from 'antd';
import { PersonalityData, BigFiveData } from '../types';
import styles from './styles.module.css';

interface PersonalityAnalysisProps {
  data: PersonalityData;
}

const BigFiveChart: React.FC<{ data: BigFiveData }> = ({ data }) => {
  const items = [
    { label: '开放性', value: data.openness, color: '#1890ff' },
    { label: '尽责性', value: data.conscientiousness, color: '#52c41a' },
    { label: '外向性', value: data.extraversion, color: '#faad14' },
    { label: '宜人性', value: data.agreeableness, color: '#722ed1' },
    { label: '神经质', value: data.neuroticism, color: '#f5222d' },
  ];

  return (
    <div className={styles.bigFive}>
      {items.map(item => (
        <div key={item.label} className={styles.bigFiveItem}>
          <span className={styles.label}>{item.label}</span>
          <Progress
            percent={item.value}
            strokeColor={item.color}
            trailColor="#f0f0f0"
            size="small"
          />
        </div>
      ))}
    </div>
  );
};

const CharacterList: React.FC<{ title: string; items: string[]; type: 'strength' | 'risk' }> = ({
  title,
  items,
  type
}) => (
  <div className={styles.characterList}>
    <h4>{title}</h4>
    <List
      dataSource={items}
      renderItem={item => (
        <List.Item>
          <Tag color={type === 'strength' ? 'success' : 'error'}>
            {item}
          </Tag>
        </List.Item>
      )}
    />
  </div>
);

export const PersonalityAnalysis: React.FC<PersonalityAnalysisProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="大五人格分析" className={styles.card}>
            <BigFiveChart data={data.bigFive} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="性格优势" className={styles.card}>
            <CharacterList
              title="主要优势特征"
              items={data.strengths}
              type="strength"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="潜在风险" className={styles.card}>
            <CharacterList
              title="需要注意的方面"
              items={data.risks}
              type="risk"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 