import React from 'react';
import { Progress } from 'antd';
import styles from './styles.module.css';

interface DimensionCompareProps {
  dimensions: string[];
  values: number[];
}

export const DimensionCompare: React.FC<DimensionCompareProps> = ({
  dimensions,
  values
}) => {
  return (
    <div className={styles.container} data-testid="dimension-compare">
      <h3 className={styles.title}>维度详情</h3>
      <div className={styles.dimensionList}>
        {dimensions.map((dimension, index) => (
          <div key={dimension} className={styles.dimensionItem}>
            <div className={styles.dimensionInfo}>
              <span className={styles.dimensionName}>{dimension}</span>
              <span className={styles.dimensionValue}>{values[index]}%</span>
            </div>
            <Progress 
              percent={values[index]} 
              showInfo={false}
              strokeColor="#f56a00"
              trailColor="#f5f5f5"
              size="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 