import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RadarChartProps } from './types';
import styles from './styles.module.css';

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  loading = false
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;
    
    chartInstance.current = echarts.init(chartRef.current);
    
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  // 更新图表数据
  useEffect(() => {
    if (!chartInstance.current || loading) return;

    const option = {
      tooltip: {
        trigger: 'item'
      },
      radar: {
        indicator: [
          { name: '开放性', max: 100 },
          { name: '尽责性', max: 100 },
          { name: '外向性', max: 100 },
          { name: '宜人性', max: 100 },
          { name: '情绪稳定性', max: 100 }
        ],
        radius: '65%',
        splitNumber: 4,
        splitArea: {
          areaStyle: {
            color: ['#fff', '#fff', '#fff', '#fff']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      series: [{
        type: 'radar',
        data: [{
          value: [
            data.openness,
            data.conscientiousness,
            data.extraversion,
            data.agreeableness,
            100 - data.neuroticism // 转换为情绪稳定性
          ],
          name: '人格特征',
          areaStyle: {
            color: 'rgba(237, 100, 166, 0.2)'
          },
          lineStyle: {
            color: '#ed64a6'
          },
          itemStyle: {
            color: '#ed64a6'
          }
        }],
        emphasis: {
          lineStyle: {
            width: 4
          }
        }
      }]
    };

    // 添加动画效果
    chartInstance.current.setOption(option);
    chartInstance.current.resize();
  }, [data, loading]);

  // 响应窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      className={styles.container}
      style={{ opacity: loading ? 0.5 : 1 }}
    />
  );
}; 