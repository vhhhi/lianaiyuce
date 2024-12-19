import React from 'react';
import { Radar } from '@ant-design/plots';
import { TestDimensions } from '../types';

interface RadarChartProps {
  dimensions: TestDimensions;
}

export const RadarChart: React.FC<RadarChartProps> = ({ dimensions }) => {
  const data = [
    { dimension: '性格特征', score: dimensions.personality },
    { dimension: '价值观', score: dimensions.values },
    { dimension: '生活方式', score: dimensions.lifestyle },
    { dimension: '兴趣爱好', score: dimensions.interests },
    { dimension: '未来规划', score: dimensions.future },
  ];

  const config = {
    data,
    xField: 'dimension',
    yField: 'score',
    meta: {
      score: {
        min: 0,
        max: 100,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    point: {
      size: 4,
    },
    area: {
      style: {
        fill: 'rgba(24, 144, 255, 0.2)',
      },
    },
  };

  return <Radar {...config} />;
}; 