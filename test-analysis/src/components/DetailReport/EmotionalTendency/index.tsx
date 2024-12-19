import React from 'react';
import { Card, Row, Col, List, Tag } from 'antd';
import { EmotionalData } from '../types';
import styles from './styles.module.css';

interface EmotionalTendencyProps {
  data: EmotionalData;
}

const PatternCard: React.FC<{
  title: string;
  value: string;
  description: string;
}> = ({ title, value, description }) => (
  <Card title={title} className={styles.card}>
    <div className={styles.patternContent}>
      <Tag color="processing" className={styles.patternTag}>
        {value}
      </Tag>
      <p className={styles.description}>{description}</p>
    </div>
  </Card>
);

const NeedsList: React.FC<{ needs: string[] }> = ({ needs }) => (
  <Card title="情感需求" className={styles.card}>
    <List
      dataSource={needs}
      renderItem={item => (
        <List.Item className={styles.needItem}>
          <Tag color="blue">{item}</Tag>
        </List.Item>
      )}
    />
  </Card>
);

const getPatternDescription = (pattern: string): string => {
  const descriptions: Record<string, string> = {
    '理性分析型': '倾向于用逻辑和理性思维处理情感问题，善于分析和理解情感背后的原因。',
    '感性直觉型': '依靠直觉和感受来理解情感，对他人的情绪变化较为敏感。',
    '平衡整合型': '能够在理性分析和感性认知之间取得平衡，情感处理较为全面。'
  };
  return descriptions[pattern] || '暂无描述';
};

const getStyleDescription = (style: string): string => {
  const descriptions: Record<string, string> = {
    '开放表达型': '愿意直接表达自己的情感和想法，沟通方式较为直接。',
    '委婉含蓄型': '倾向于委婉地表达情感，注重维护他人感受。',
    '选择性表达型': '根据具体情况选择合适的表达方式，情感表达较为灵活。'
  };
  return descriptions[style] || '暂无描述';
};

export const EmotionalTendency: React.FC<EmotionalTendencyProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <PatternCard
            title="情感认知模式"
            value={data.cognitionPattern}
            description={getPatternDescription(data.cognitionPattern)}
          />
        </Col>
        <Col xs={24} md={12}>
          <PatternCard
            title="情感表达方式"
            value={data.expressionStyle}
            description={getStyleDescription(data.expressionStyle)}
          />
        </Col>
        <Col span={24}>
          <NeedsList needs={data.needs} />
        </Col>
      </Row>
    </div>
  );
}; 