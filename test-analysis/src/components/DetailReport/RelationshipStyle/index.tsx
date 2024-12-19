import React from 'react';
import { Card, Row, Col, Tag, List } from 'antd';
import { RelationshipData } from '../types';
import styles from './styles.module.css';

interface RelationshipStyleProps {
  data: RelationshipData;
}

const StyleCard: React.FC<{
  title: string;
  value: string;
  description: string;
  features: string[];
}> = ({ title, value, description, features }) => (
  <Card title={title} className={styles.card}>
    <div className={styles.styleContent}>
      <Tag color="purple" className={styles.styleTag}>
        {value}
      </Tag>
      <p className={styles.description}>{description}</p>
      <div className={styles.features}>
        <h4>主要特征：</h4>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

const ExpectationsList: React.FC<{ expectations: string[] }> = ({ expectations }) => (
  <Card title="关系期待" className={styles.card}>
    <List
      dataSource={expectations}
      renderItem={item => (
        <List.Item className={styles.expectationItem}>
          <Tag color="cyan">{item}</Tag>
        </List.Item>
      )}
    />
  </Card>
);

const getAttachmentInfo = (style: string): { description: string; features: string[] } => {
  const info: Record<string, { description: string; features: string[] }> = {
    '安全型': {
      description: '具有健康的自我认知和人际关系观,能够在亲密关系中保持平衡。',
      features: [
        '对自己和他人持积极态度',
        '能够建立稳定的情感连接',
        '在关系中保持适度的独立性'
      ]
    },
    '焦虑型': {
      description: '对关系较为敏感,容易产生不安全感,渴望亲密但又担心失去。',
      features: [
        '对关系变化高度敏感',
        '需要频繁的情感确认',
        '害怕被抛弃或拒绝'
      ]
    },
    '回避型': {
      description: '倾向于保持情感距离,对亲密关系持谨慎态度。',
      features: [
        '重视个人独立空间',
        '不易表达深层情感',
        '对亲密关系保持警惕'
      ]
    }
  };
  return info[style] || { description: '暂无描述', features: [] };
};

const getCommunicationInfo = (style: string): { description: string; features: string[] } => {
  const info: Record<string, { description: string; features: string[] }> = {
    '直接型': {
      description: '倾向于清晰、直接地表达想法和需求,注重有效沟通。',
      features: [
        '表达清晰直接',
        '善于提出建议和反馈',
        '重视问题的及时解决'
      ]
    },
    '协调型': {
      description: '注重维护关系和谐,善于调节气氛,避免冲突。',
      features: [
        '善于维护关系氛围',
        '注重各方感受',
        '擅长化解矛盾'
      ]
    },
    '分析型': {
      description: '习惯从理性角度分析问题,注重逻辑和事实。',
      features: [
        '善于分析问题本质',
        '重视客观事实',
        '追求合理解决方案'
      ]
    }
  };
  return info[style] || { description: '暂无描述', features: [] };
};

export const RelationshipStyle: React.FC<RelationshipStyleProps> = ({ data }) => {
  const attachmentInfo = getAttachmentInfo(data.attachmentStyle);
  const communicationInfo = getCommunicationInfo(data.communicationStyle);

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <StyleCard
            title="依恋类型"
            value={data.attachmentStyle}
            description={attachmentInfo.description}
            features={attachmentInfo.features}
          />
        </Col>
        <Col xs={24} md={12}>
          <StyleCard
            title="沟通方式"
            value={data.communicationStyle}
            description={communicationInfo.description}
            features={communicationInfo.features}
          />
        </Col>
        <Col span={24}>
          <ExpectationsList expectations={data.expectations} />
        </Col>
      </Row>
    </div>
  );
}; 