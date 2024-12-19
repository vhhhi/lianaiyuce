import React from 'react';
import { Row, Col, Card, List, Tag } from 'antd';
import { RadarChart } from '../RadarChart';
import { PersonalitySectionProps } from './types';
import styles from './styles.module.css';

export const PersonalitySection: React.FC<PersonalitySectionProps> = ({
  data,
  dimensions
}) => {
  return (
    <div className={styles.container}>
      {/* Big Five 人格维度图表 */}
      <div className={styles.chartSection}>
        <h3 className={styles.title}>Big Five 人格维度分析</h3>
        <div className={styles.chartWrapper}>
          <RadarChart data={data.bigFive} />
        </div>
      </div>

      <Row gutter={[24, 24]} className={styles.infoSection}>
        {/* 性格优势 */}
        <Col xs={24} md={12}>
          <Card title="性格优势" className={styles.card}>
            <List
              dataSource={data.strengths}
              renderItem={item => (
                <List.Item>
                  <Tag color="success">{item}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 潜在风险 */}
        <Col xs={24} md={12}>
          <Card title="需要注意" className={styles.card}>
            <List
              dataSource={data.risks}
              renderItem={item => (
                <List.Item>
                  <Tag color="warning">{item}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 