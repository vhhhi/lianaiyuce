import React from 'react';
import { Form, Input, DatePicker, Radio, FormInstance } from 'antd';
import styles from './BasicInfoForm.module.css';

interface BasicInfoFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ form, onFinish, initialValues }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      className={styles.form}
    >
      <Form.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: '请输入您的姓名' }]}
      >
        <Input placeholder="请输入您的姓名" />
      </Form.Item>

      <Form.Item
        label="性别"
        name="gender"
        rules={[{ required: true, message: '请选择您的性别' }]}
      >
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="出生日期"
        name="birthDate"
        rules={[{ required: true, message: '请选择您的出生日期' }]}
      >
        <DatePicker placeholder="请选择出生日期" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="电话号码"
        name="phone"
        rules={[
          { required: true, message: '请输入您的电话号码' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
        ]}
      >
        <Input placeholder="请输入您的电话号码" />
      </Form.Item>

      <Form.Item
        label="电子邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入您的电子邮箱' },
          { type: 'email', message: '请输入正确的邮箱格式' }
        ]}
      >
        <Input placeholder="请输入您的电子邮箱" />
      </Form.Item>
    </Form>
  );
};

export default BasicInfoForm; 