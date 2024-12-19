import React from 'react';
import { Card, Steps, Button, message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import PersonalityQuestionnaire from './components/PersonalityQuestionnaire';
import ValuesQuestionnaire from './components/ValuesQuestionnaire';
import LifestyleQuestionnaire from './components/LifestyleQuestionnaire';
import styles from './index.module.css';

const { Step } = Steps;

const PersonalityTest: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const steps = [
    {
      title: '性格测试',
      description: '了解您的性格特征'
    },
    {
      title: '价值观测试',
      description: '探索您的核心价值观'
    },
    {
      title: '生活习惯',
      description: '了解您的生活方式'
    }
  ];

  const handleFormFinish = (values: any) => {
    const newFormData = { ...formData, ...values };
    setFormData(newFormData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 最后一步，提交所有数据
      console.log('提交的完整数据:', newFormData);
      message.success('测试提交成功！');
      // 跳转到结果页面
      navigate('/test/result', { state: { testData: newFormData } });
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    const props = {
      form,
      onFinish: handleFormFinish,
      initialValues: formData
    };

    switch (currentStep) {
      case 0:
        return <PersonalityQuestionnaire {...props} />;
      case 1:
        return <ValuesQuestionnaire {...props} />;
      case 2:
        return <LifestyleQuestionnaire {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Card title="个性测试" className={styles.card}>
        <Steps current={currentStep} className={styles.steps}>
          {steps.map(item => (
            <Step 
              key={item.title} 
              title={item.title} 
              description={item.description} 
            />
          ))}
        </Steps>

        <div className={styles.content}>
          <div className={styles.stepContent}>
            {renderStepContent()}
          </div>
        </div>

        <div className={styles.actions}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={prev}>
              上一步
            </Button>
          )}
          <Button 
            type="primary" 
            onClick={() => form.submit()}
          >
            {currentStep === steps.length - 1 ? '提交测试' : '下一步'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PersonalityTest; 