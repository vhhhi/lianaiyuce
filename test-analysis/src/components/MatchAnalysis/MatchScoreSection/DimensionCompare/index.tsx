import React from 'react';
import { Row, Col, Progress, Tooltip } from 'antd';
import { DimensionCompareProps } from './types';
import styles from './styles.module.css';

// 维度名称映射
const dimensionNames = {
  personality: '性格特征',
  values: '价值观',
  lifestyle: '生活方式',
  interests: '兴趣爱好',
  future: '未来规划'
};

// 维度说明
const dimensionDescriptions = {
  personality: '反映双方性格特征的契合程度',
  values: '体现核心价值观的一致性',
  lifestyle: '表示生活方式的协调程度',
  interests: '展示兴趣爱好的重叠度',
  future: '反映未来发展规划的匹配度'
};

export const DimensionCompare: React.FC<DimensionCompareProps> = ({
  selfData,
  partnerData,
  matchData,
  loading = false
}) => {
  // 获取所有维度
  const dimensions = Object.keys(dimensionNames) as Array<keyof typeof dimensionNames>;

  // 判断是否为高匹配度(>80)
  const isHighMatch = (score: number) => score >= 80;

  return (
    <div className={styles.container}>
      {dimensions.map(dimension => (
        <Tooltip
          key={dimension}
          title={dimensionDescriptions[dimension]}
          placement="right"
        >
          <div 
            className={`${styles.dimensionItem} ${
              isHighMatch(matchData[dimension]) ? styles.highMatch : ''
            }`}
          >
            <div className={styles.dimensionHeader}>
              <span className={styles.dimensionName}>
                {dimensionNames[dimension]}
              </span>
              <span className={styles.matchScore}>
                匹配度: {matchData[dimension]}%
              </span>
            </div>

            <Row gutter={[16, 16]} align="middle">
              <Col span={24}>
                <div className={styles.progressGroup}>
                  {/* 自己的得分 */}
                  <div className={styles.progressItem}>
                    <div className={styles.progressLabel}>我的特征</div>
                    <Progress
                      percent={selfData[dimension]}
                      size="small"
                      strokeColor="#4299e1"
                      trailColor="#e2e8f0"
                      showInfo={false}
                    />
                    <div className={styles.progressValue}>
                      {selfData[dimension]}
                    </div>
                  </div>

                  {/* 伴侣的得分 */}
                  <div className={styles.progressItem}>
                    <div className={styles.progressLabel}>伴侣特征</div>
                    <Progress
                      percent={partnerData[dimension]}
                      size="small"
                      strokeColor="#48bb78"
                      trailColor="#e2e8f0"
                      showInfo={false}
                    />
                    <div className={styles.progressValue}>
                      {partnerData[dimension]}
                    </div>
                  </div>

                  {/* 匹配度 */}
                  <div className={styles.progressItem}>
                    <div className={styles.progressLabel}>匹配度</div>
                    <Progress
                      percent={matchData[dimension]}
                      size="small"
                      strokeColor="#ed64a6"
                      trailColor="#e2e8f0"
                      showInfo={false}
                    />
                    <div className={styles.progressValue}>
                      {matchData[dimension]}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}; 