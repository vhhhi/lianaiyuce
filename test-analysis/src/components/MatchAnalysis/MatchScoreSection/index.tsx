import React from 'react';
import { Row, Col, Progress, Card } from 'antd';
import { RadarChart } from './RadarChart';
import { DimensionCompare } from './DimensionCompare';
import { MatchScoreSectionProps } from './types';
import styles from './styles.module.css';

export const MatchScoreSection: React.FC<MatchScoreSectionProps> = ({
  data,
  selfResult,
  partnerResult,
  loading = false
}) => {
  return (
    <div className={styles.container}>
      {/* 总体匹配度 */}
      <div className={styles.overallScore}>
        <Progress
          type="circle"
          percent={data.overallMatch}
          size={160}
          strokeColor="#ed64a6"
          format={percent => (
            <div className={styles.scoreContent}>
              <div className={styles.scoreValue}>{percent}</div>
              <div className={styles.scoreLabel}>总体匹配度</div>
            </div>
          )}
        />
      </div>

      <Row gutter={[24, 24]}>
        {/* 维度雷达图对比 */}
        <Col xs={24} lg={12}>
          <Card title="维度匹配分析" className={styles.card}>
            <div className={styles.chartWrapper}>
              <RadarChart 
                selfData={selfResult.dimensions}
                partnerData={partnerResult.dimensions}
                matchData={data.dimensions}
              />
            </div>
          </Card>
        </Col>

        {/* 具体维度对比 */}
        <Col xs={24} lg={12}>
          <Card title="维度详细对比" className={styles.card}>
            <DimensionCompare
              selfData={selfResult.dimensions}
              partnerData={partnerResult.dimensions}
              matchData={data.dimensions}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 