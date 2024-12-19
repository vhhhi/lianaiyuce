import React from 'react';
import { Button } from 'antd';
import styles from './index.module.css';

export const ValueProposition: React.FC = () => {
  return (
    <section className={styles.valueSection}>
      <h1 className={styles.title}>找到您的完美伴侣</h1>
      <p className={styles.description}>
        基于AI的智能匹配系统，帮助您找到真正的灵魂伴侣
      </p>
      <Button type="primary" size="large" className={styles.actionButton}>
        立即开始
      </Button>
    </section>
  );
}; 