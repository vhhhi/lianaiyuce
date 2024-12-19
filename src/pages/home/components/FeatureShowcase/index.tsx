import React from 'react';
import { Row, Col } from 'antd';
import { 
  ExperimentOutlined, 
  HeartOutlined, 
  TeamOutlined, 
  BookOutlined 
} from '@ant-design/icons';
import { FeatureCard } from './FeatureCard';
import { Feature } from './types';
import styles from './index.module.css';

export const FeatureShowcase: React.FC = () => {
  const features: Feature[] = [
    {
      title: '智能测评',
      description: '多维度个性测试，全方位了解自己',
      icon: <ExperimentOutlined />
    },
    {
      title: '匹配分析',
      description: 'AI智能匹配，找到最适合的伴侣',
      icon: <HeartOutlined />
    },
    {
      title: '专家咨询',
      description: '专业情感顾问，为爱情保驾护航',
      icon: <TeamOutlined />
    },
    {
      title: '情感课程',
      description: '系统提升情商，学习经营感情',
      icon: <BookOutlined />
    }
  ];

  return (
    <div className={styles.featureShowcase}>
      <h2 className={styles.sectionTitle}>核心功能</h2>
      <Row gutter={[24, 24]}>
        {features.map(feature => (
          <Col xs={24} sm={12} md={6} key={feature.title}>
            <FeatureCard {...feature} />
          </Col>
        ))}
      </Row>
    </div>
  );
}; 