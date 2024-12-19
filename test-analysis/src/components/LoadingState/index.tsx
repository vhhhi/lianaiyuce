import React from 'react';
import { Spin, Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

interface LoadingStateProps {
  loading: boolean;
  skeleton?: boolean;
  tip?: string;
  children: React.ReactNode;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  skeleton = false,
  tip = '加载中...',
  children
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  if (skeleton) {
    return (
      <div className={styles.skeleton}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Spin indicator={antIcon} tip={tip} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}; 