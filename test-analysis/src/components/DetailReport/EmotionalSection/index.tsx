import React from 'react';
import { Card, Row, Col, List, Typography } from 'antd';
import { 
  HeartOutlined, 
  MessageOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { EmotionalSectionProps } from './types';
import styles from './styles.module.css';

const { Title, Text } = Typography;

export const EmotionalSection: React.FC<EmotionalSectionProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {/* 情感认知模式 */}
        <Col xs={24} md={12}>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <HeartOutlined className={styles.icon} />
              <Title level={4}>情感认知模式</Title>
            </div>
            <Text className={styles.content}>{data.cognitionPattern}</Text>
          </Card>
        </Col>

        {/* 表达方式 */}
        <Col xs={24} md={12}>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <MessageOutlined className={styles.icon} />
              <Title level={4}>表达方式</Title>
            </div>
            <Text className={styles.content}>{data.expressionStyle}</Text>
          </Card>
        </Col>

        {/* 情感需求 */}
        <Col xs={24}>
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <UserOutlined className={styles.icon} />
              <Title level={4}>核心情感需求</Title>
            </div>
            <List
              dataSource={data.needs}
              renderItem={item => (
                <List.Item className={styles.listItem}>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 