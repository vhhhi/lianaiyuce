import React from 'react';
import { Progress, Row, Col, Card } from 'antd';
import styles from './index.module.css';

interface MatchScore {
  dimension: string;
  score: number;
  description: string;
}

interface MatchScoreSectionProps {
  totalScore: number;
  scores: MatchScore[];
}

const MatchScoreSection: React.FC<MatchScoreSectionProps> = ({ totalScore, scores }) => {
  return (
    <div className={styles.container}>
      {/* 总体匹配度 */}
      <div className={styles.totalScore}>
        <Progress
          type="circle"
          percent={totalScore}
          format={(percent) => `${percent}%`}
          size={120}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <h3>总体匹配度</h3>
      </div>

      {/* 各维度匹配度 */}
      <Row gutter={[16, 16]} className={styles.dimensions}>
        {scores.map((score, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className={styles.dimensionCard}>
              <h4>{score.dimension}</h4>
              <Progress
                percent={score.score}
                size="small"
                status={score.score >= 60 ? "success" : "exception"}
              />
              <p>{score.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MatchScoreSection; 