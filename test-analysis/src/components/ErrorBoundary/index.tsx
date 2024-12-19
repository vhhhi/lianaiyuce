import React, { Component, ErrorInfo } from 'react';
import { Result, Button } from 'antd';
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 这里可以添加错误日志上报
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Result
          status="error"
          title="页面出错了"
          subTitle={error?.message || '抱歉，页面发生了一些错误'}
          extra={[
            <Button 
              key="retry" 
              type="primary" 
              onClick={this.handleRetry}
            >
              重试
            </Button>
          ]}
          className={styles.result}
        />
      );
    }

    return children;
  }
} 