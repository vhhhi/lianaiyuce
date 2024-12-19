import React from 'react';
import { Row, Col, Card, List } from 'antd';
import { 
  CheckCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { ComplementarySectionProps } from './types';
import styles from './styles.module.css';

export const ComplementarySection: React.FC<ComplementarySectionProps> = ({
  data,
  loading = false
}) => {
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {/* 互补优势 */}
        <Col xs={24} md={12}>
          <Card 
            title={
              <div className={styles.cardTitle}>
                <CheckCircleOutlined className={styles.strengthIcon} />
                <span>互补优势</span>
              </div>
            }
            className={`${styles.card} ${styles.strengthCard}`}
            loading={loading}
          >
            <List
              dataSource={data.strengths}
              renderItem={item => (
                <List.Item className={styles.listItem}>
                  <div className={styles.listContent}>
                    {item}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 互补挑战 */}
        <Col xs={24} md={12}>
          <Card
            title={
              <div className={styles.cardTitle}>
                <ExclamationCircleOutlined className={styles.challengeIcon} />
                <span>互补挑战</span>
              </div>
            }
            className={`${styles.card} ${styles.challengeCard}`}
            loading={loading}
          >
            <List
              dataSource={data.challenges}
              renderItem={item => (
                <List.Item className={styles.listItem}>
                  <div className={styles.listContent}>
                    {item}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 