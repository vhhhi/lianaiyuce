import React from 'react';
import { Row, Col, Card } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface Analysis {
  title: string;
  description: string;
}

interface StrengthWeaknessSectionProps {
  strengths: Analysis[];
  weaknesses: Analysis[];
}

const StrengthWeaknessSection: React.FC<StrengthWeaknessSectionProps> = ({
  strengths,
  weaknesses,
}) => {
  return (
    <Row gutter={[24, 24]}>
      {/* 优势分析 */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className={styles.cardTitle}>
              <CheckCircleOutlined className={styles.strengthIcon} />
              <span>关系优势</span>
            </div>
          }
          className={styles.strengthCard}
        >
          {strengths.map((item, index) => (
            <div key={index} className={styles.analysisItem}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </Card>
      </Col>

      {/* 劣势分析 */}
      <Col xs={24} md={12}>
        <Card 
          title={
            <div className={styles.cardTitle}>
              <ExclamationCircleOutlined className={styles.weaknessIcon} />
              <span>需要改善</span>
            </div>
          }
          className={styles.weaknessCard}
        >
          {weaknesses.map((item, index) => (
            <div key={index} className={styles.analysisItem}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default StrengthWeaknessSection; 