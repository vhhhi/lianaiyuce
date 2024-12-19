import React from 'react';
import { Form, Radio, FormInstance } from 'antd';
import styles from './LifestyleQuestionnaire.module.css';

interface LifestyleQuestionnaireProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const questions = [
  {
    id: 'workSchedule',
    question: '您习惯的工作时间是：',
    options: [
      { value: 'early', label: '早起工作型（5-6点开始）' },
      { value: 'normal', label: '正常作息（9-6点）' },
      { value: 'late', label: '晚睡晚起型（11点后工作）' },
      { value: 'flexible', label: '弹性工作制' }
    ]
  },
  {
    id: 'exercise',
    question: '您的运动习惯：',
    options: [
      { value: 'regular', label: '每周固定运动3次以上' },
      { value: 'occasional', label: '偶尔运动' },
      { value: 'rare', label: '很少运动' },
      { value: 'never', label: '基本不运动' }
    ]
  },
  {
    id: 'social',
    question: '周末休闲方式：',
    options: [
      { value: 'outdoor', label: '户外活动' },
      { value: 'indoor', label: '在家休息' },
      { value: 'social', label: '社交聚会' },
      { value: 'work', label: '处理工作' }
    ]
  },
  {
    id: 'diet',
    question: '饮食习惯：',
    options: [
      { value: 'regular', label: '规律三餐' },
      { value: 'irregular', label: '不规律' },
      { value: 'health', label: '注重健康饮食' },
      { value: 'random', label: '随性' }
    ]
  },
  {
    id: 'spending',
    question: '消费习惯：',
    options: [
      { value: 'plan', label: '计划性消费' },
      { value: 'impulse', label: '偶尔冲动消费' },
      { value: 'save', label: '储蓄为主' },
      { value: 'enjoy', label: '及时享受' }
    ]
  }
];

const LifestyleQuestionnaire: React.FC<LifestyleQuestionnaireProps> = ({
  form,
  onFinish,
  initialValues
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      className={styles.form}
    >
      {questions.map((q) => (
        <Form.Item
          key={q.id}
          label={q.question}
          name={q.id}
          rules={[{ required: true, message: '请选择一个选项' }]}
        >
          <Radio.Group>
            {q.options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      ))}
    </Form>
  );
};

export default LifestyleQuestionnaire; 