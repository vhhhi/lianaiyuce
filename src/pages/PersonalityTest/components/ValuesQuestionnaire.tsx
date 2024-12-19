import React from 'react';
import { Form, Rate, FormInstance } from 'antd';
import styles from './ValuesQuestionnaire.module.css';

interface ValuesQuestionnaireProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const values = [
  {
    id: 'family',
    label: '家庭',
    description: '重视家庭关系和亲情'
  },
  {
    id: 'career',
    label: '事业',
    description: '追求职业成就和发展'
  },
  {
    id: 'health',
    label: '健康',
    description: '关注身心健康'
  },
  {
    id: 'friendship',
    label: '友情',
    description: '重视朋友关系'
  },
  {
    id: 'money',
    label: '财富',
    description: '追求物质生活'
  },
  {
    id: 'knowledge',
    label: '知识',
    description: '追求学习和成长'
  },
  {
    id: 'social',
    label: '社会责任',
    description: '关注社会贡献'
  }
];

const ValuesQuestionnaire: React.FC<ValuesQuestionnaireProps> = ({
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
      <div className={styles.description}>
        请为以下各项价值观评分（1-5分），1分表示最不重要，5分表示最重要
      </div>
      
      {values.map((value) => (
        <Form.Item
          key={value.id}
          label={`${value.label} - ${value.description}`}
          name={value.id}
          rules={[{ required: true, message: '请评分' }]}
        >
          <Rate />
        </Form.Item>
      ))}
    </Form>
  );
};

export default ValuesQuestionnaire; 