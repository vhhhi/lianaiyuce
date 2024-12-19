import React from 'react';
import { Card, Progress, Spin, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ResultOverviewProps } from './types';
import styles from './styles.module.css';

export const ResultOverview: React.FC<ResultOverviewProps> = ({
  result,
  loading = false,
  error,
  onRefresh
}) => {
  // 如果有错误，显示错误信息
  if (error) {
    return (
      <Card className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          {onRefresh && (
            <Button onClick={onRefresh} icon={<ReloadOutlined />}>
              重试
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // 渲染维度得分项
  const renderDimension = (label: string, value: number) => (
    <div key={label} className={styles.dimensionItem}>
      <div className={styles.dimensionLabel}>{label}</div>
      <Progress 
        type="circle"
        percent={value}
        width={80}
        strokeColor="#ed64a6"
      />
    </div>
  );

  return (
    <Card className={`${styles.container} ${loading ? styles.loading : ''}`}>
      <Spin spinning={loading}>
        <div className={styles.header}>
          <h2 className={styles.title}>测评结果概览</h2>
          {onRefresh && (
            <Button 
              icon={<ReloadOutlined />}
              onClick={onRefresh}
            >
              刷新
            </Button>
          )}
        </div>

        {/* 总体匹配度分数 */}
        <div className={styles.score}>
          <Progress
            type="circle"
            percent={result.overallScore}
            size={120}
            strokeColor="#ed64a6"
          />
          <div className={styles.scoreLabel}>总体匹配度</div>
        </div>

        {/* 各维度得分 */}
        <div className={styles.dimensions}>
          {renderDimension('性格维度', result.dimensions.personality)}
          {renderDimension('价值观', result.dimensions.values)}
          {renderDimension('生活方式', result.dimensions.lifestyle)}
          {renderDimension('兴趣爱好', result.dimensions.interests)}
          {renderDimension('未来规划', result.dimensions.future)}
        </div>

        {/* 页脚信息 */}
        <div className={styles.footer}>
          <span>测试完成时间：{result.completedAt}</span>
          <span>版本：{result.version}</span>
        </div>
      </Spin>
    </Card>
  );
};
