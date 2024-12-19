import React from 'react';
import { Collapse, List, Tag } from 'antd';
import { 
  UserOutlined,
  ClockCircleOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { IssuesSectionProps } from './types';
import styles from './styles.module.css';

const { Panel } = Collapse;

// 问题类型配置
const issueTypes = {
  personality: {
    title: '性格冲突',
    icon: <UserOutlined />,
    color: '#e53e3e',
    description: '由双方性格特征差异可能导致的问题'
  },
  lifestyle: {
    title: '生活习惯差异',
    icon: <ClockCircleOutlined />,
    color: '#dd6b20',
    description: '在日常生活方式上的不一致'
  },
  values: {
    title: '价值观冲突',
    icon: <HeartOutlined />,
    color: '#805ad5',
    description: '在核心价值观念上的分歧'
  }
};

export const IssuesSection: React.FC<IssuesSectionProps> = ({
  data,
  loading = false
}) => {
  return (
    <div className={styles.container}>
      <Collapse 
        defaultActiveKey={['personality']}
        expandIconPosition="right"
        className={styles.collapse}
      >
        {Object.entries(issueTypes).map(([key, config]) => (
          <Panel
            key={key}
            header={
              <div className={styles.panelHeader}>
                <span className={styles.icon} style={{ color: config.color }}>
                  {config.icon}
                </span>
                <span className={styles.title}>{config.title}</span>
                <Tag color={config.color} className={styles.count}>
                  {data[key as keyof IssuesData].length}项
                </Tag>
              </div>
            }
            extra={
              <span className={styles.description}>
                {config.description}
              </span>
            }
          >
            <List
              dataSource={data[key as keyof IssuesData]}
              renderItem={item => (
                <List.Item className={styles.listItem}>
                  <div className={styles.listContent}>
                    {item}
                  </div>
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}; 