import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { RadarChart } from './RadarChart';
import { formatDate } from '../../../utils/date';
import { TestResultOverview } from '../types';
import styles from './styles.module.css';

interface ResultOverviewProps {
  data: TestResultOverview;
}

export const ResultOverview: React.FC<ResultOverviewProps> = ({ data }) => {
  const { 
    overallScore,
    dimensions,
    completedAt,
    version
  } = data;

  return (
    <Card className={styles.container}>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={8}>
          <div className={styles.scoreSection}>
            <Statistic
              title="总体评分"
              value={overallScore}
              suffix="/100"
              className={styles.score}
            />
            <div className={styles.meta}>
              <div>测试完成时间: {formatDate(completedAt)}</div>
              <div>测试版本: {version}</div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={16}>
          <div className={styles.chartSection}>
            <RadarChart dimensions={dimensions} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}; 