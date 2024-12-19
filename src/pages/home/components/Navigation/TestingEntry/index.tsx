import React from 'react';
import { Row, Col } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  SolutionOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { TestingEntryCard } from './TestingEntryCard';
import { TestEntry } from './types';
import styles from './index.module.css';

export const TestingEntry: React.FC = () => {
  const entries: TestEntry[] = [
    {
      title: '个性测试',
      description: '了解自己的性格特点和生活习惯',
      path: '/test/personality',
      icon: <UserOutlined />
    },
    {
      title: '匹配分析',
      description: '查看与伴侣的匹配程度',
      path: '/test-analysis',
      icon: <HeartOutlined />
    },
    {
      title: '关系评估',
      description: '评估当前感情状况',
      path: '/test/relationship',
      icon: <SolutionOutlined />
    },
    {
      title: '价值观测试',
      description: '探索个人核心价值观',
      path: '/test/values',
      icon: <SafetyCertificateOutlined />
    }
  ];

  return (
    <div className={styles.testingEntry}>
      <h2 className={styles.sectionTitle}>测评中心</h2>
      <p className={styles.sectionDesc}>专业的测评帮助您更好地认识自己和伴侣</p>
      <Row gutter={[24, 24]}>
        {entries.map(entry => (
          <Col xs={24} sm={12} md={6} key={entry.title}>
            <TestingEntryCard {...entry} />
          </Col>
        ))}
      </Row>
    </div>
  );
}; 