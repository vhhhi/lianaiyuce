import React from 'react';
import { Form, Radio, FormInstance } from 'antd';
import styles from './PersonalityQuestionnaire.module.css';

interface PersonalityQuestionnaireProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const questions = [
  {
    id: 'q1',
    question: '在社交场合中，您通常是：',
    options: [
      { value: 'E', label: '喜欢成为注意力的焦点' },
      { value: 'I', label: '倾向于安静观察' }
    ]
  },
  {
    id: 'q2',
    question: '做决定时，您更倾向于：',
    options: [
      { value: 'T', label: '依据逻辑和事实' },
      { value: 'F', label: '考虑他人感受' }
    ]
  },
  {
    id: 'q3',
    question: '面对新环境时，您通常会：',
    options: [
      { value: 'J', label: '提前计划和准备' },
      { value: 'P', label: '随机应变' }
    ]
  },
  {
    id: 'q4',
    question: '您更喜欢：',
    options: [
      { value: 'S', label: '关注具体细节' },
      { value: 'N', label: '关注整体概念' }
    ]
  },
  {
    id: 'q5',
    question: '在团队中，您更倾向于：',
    options: [
      { value: 'E', label: '主动发表意见' },
      { value: 'I', label: '仔细聆听他人' }
    ]
  }
];

const PersonalityQuestionnaire: React.FC<PersonalityQuestionnaireProps> = ({
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

export default PersonalityQuestionnaire; 