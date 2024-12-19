import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RadarChartProps } from './types';
import styles from './styles.module.css';

export const RadarChart: React.FC<RadarChartProps> = ({
  selfData,
  partnerData,
  matchData,
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
      legend: {
        data: ['我的特征', '伴侣特征', '匹配度'],
        bottom: 0
      },
      radar: {
        indicator: [
          { name: '性格特征', max: 100 },
          { name: '价值观', max: 100 },
          { name: '生活方式', max: 100 },
          { name: '兴趣爱好', max: 100 },
          { name: '未来规划', max: 100 }
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
      series: [
        {
          name: '特征对比',
          type: 'radar',
          data: [
            {
              value: [
                selfData.personality,
                selfData.values,
                selfData.lifestyle,
                selfData.interests,
                selfData.future
              ],
              name: '我的特征',
              symbolSize: 6,
              lineStyle: {
                width: 2,
                color: '#4299e1'
              },
              areaStyle: {
                color: 'rgba(66, 153, 225, 0.2)'
              }
            },
            {
              value: [
                partnerData.personality,
                partnerData.values,
                partnerData.lifestyle,
                partnerData.interests,
                partnerData.future
              ],
              name: '伴侣特征',
              symbolSize: 6,
              lineStyle: {
                width: 2,
                color: '#48bb78'
              },
              areaStyle: {
                color: 'rgba(72, 187, 120, 0.2)'
              }
            },
            {
              value: [
                matchData.personality,
                matchData.values,
                matchData.lifestyle,
                matchData.interests,
                matchData.future
              ],
              name: '匹配度',
              symbolSize: 6,
              lineStyle: {
                width: 3,
                color: '#ed64a6'
              },
              areaStyle: {
                color: 'rgba(237, 100, 166, 0.2)'
              }
            }
          ]
        }
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    };

    chartInstance.current.setOption(option);
    chartInstance.current.resize();
  }, [selfData, partnerData, matchData, loading]);

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