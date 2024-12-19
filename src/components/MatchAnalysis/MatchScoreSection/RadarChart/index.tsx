import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './styles.module.css';

interface RadarChartProps {
  data: {
    dimensions: string[];
    values: number[];
  };
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // 配置项
    const option = {
      radar: {
        indicator: data.dimensions.map(dim => ({
          name: dim,
          max: 100
        })),
        splitNumber: 4,
        axisName: {
          color: '#333',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: ['#ddd']
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)']
          }
        }
      },
      series: [{
        type: 'radar',
        data: [{
          value: data.values,
          name: '匹配度',
          symbolSize: 6,
          lineStyle: {
            width: 2,
            color: '#f56a00'
          },
          areaStyle: {
            color: 'rgba(245,106,0,0.2)'
          }
        }]
      }]
    };

    // 设置配置项
    chartInstance.current.setOption(option);

    // 响应式处理
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [data]);

  return (
    <div 
      ref={chartRef} 
      className={styles.radarChart}
      data-testid="radar-chart"
    />
  );
}; 