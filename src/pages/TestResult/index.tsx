import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const TestResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testData = location.state?.testData || {};

  // 分析性格类型
  const analyzePersonality = () => {
    const { q1, q2, q3, q4, q5 } = testData;
    let personalityType = '';
    personalityType += q1 === 'E' ? 'E' : 'I';
    personalityType += q2 === 'T' ? 'T' : 'F';
    personalityType += q3 === 'J' ? 'J' : 'P';
    personalityType += q4 === 'S' ? 'S' : 'N';
    return personalityType;
  };

  // 分析价值观倾向
  const analyzeValues = () => {
    const values = ['family', 'career', 'health', 'friendship', 'money', 'knowledge', 'social'];
    const highestValues = values
      .map(key => ({ key, value: testData[key] || 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    return highestValues;
  };

  // 分析生活习惯
  const analyzeLifestyle = () => {
    const { workSchedule, exercise, social, diet, spending } = testData;
    return {
      workSchedule,
      exercise,
      social,
      diet,
      spending
    };
  };

  const personality = analyzePersonality();
  const values = analyzeValues();
  const lifestyle = analyzeLifestyle();

  const handleViewAnalysis = () => {
    navigate('/test-analysis', { state: { testData } });
  };

  return (
    <div className={styles.container}>
      <Card title="测试结果分析" className={styles.card}>
        <div className={styles.section}>
          <h2>性格特征</h2>
          <p>根据测试结果，您的性格类型是：{personality}</p>
          <div className={styles.description}>
            {/* 这里可以根据不同的性格类型显示详细描述 */}
            <p>您是一个{personality.includes('E') ? '外向' : '内向'}的人...</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2>价值观倾向</h2>
          <p>您最重视的三个价值观：</p>
          <Row gutter={[16, 16]}>
            {values.map(({ key, value }) => (
              <Col key={key} span={8}>
                <Card className={styles.valueCard}>
                  <h3>{key}</h3>
                  <p>重视程度：{value}星</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className={styles.section}>
          <h2>生活习惯分析</h2>
          <ul className={styles.lifestyleList}>
            <li>工作时间：{lifestyle.workSchedule}</li>
            <li>运动习惯：{lifestyle.exercise}</li>
            <li>社交方式：{lifestyle.social}</li>
            <li>饮食习惯：{lifestyle.diet}</li>
            <li>消费习惯：{lifestyle.spending}</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button type="primary" onClick={handleViewAnalysis}>
            查看详细匹配分析
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestResult; 