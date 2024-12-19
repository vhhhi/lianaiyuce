import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import { DetailReport } from '../../components/DetailReport';
import { MatchAnalysis } from '../../components/MatchAnalysis';
import { useReport } from '../../contexts/ReportContext';
import { LoadingState } from '../../components/LoadingState';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import styles from './styles.module.css';

const { Content } = Layout;
const { TabPane } = Tabs;

export const TestReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, fetchReport } = useReport();
  const { loading, error, testResult, partnerResult, matchAnalysis } = state;

  useEffect(() => {
    if (id) {
      fetchReport(id);
    }
  }, [id, fetchReport]);

  return (
    <ErrorBoundary>
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <LoadingState loading={loading} skeleton>
            {error ? (
              <div className={styles.error}>
                <h2>加载失败</h2>
                <p>{error.message}</p>
                <button onClick={() => fetchReport(id!)}>重试</button>
              </div>
            ) : (
              <Tabs defaultActiveKey="detail" className={styles.tabs}>
                <TabPane tab="个人测评报告" key="detail">
                  {testResult && <DetailReport data={testResult} />}
                </TabPane>
                <TabPane tab="匹配分析报告" key="match">
                  {testResult && partnerResult && matchAnalysis && (
                    <MatchAnalysis
                      selfResult={testResult}
                      partnerResult={partnerResult}
                      matchAnalysis={matchAnalysis}
                    />
                  )}
                </TabPane>
              </Tabs>
            )}
          </LoadingState>
        </Content>
      </Layout>
    </ErrorBoundary>
  );
};

export default TestReport;
