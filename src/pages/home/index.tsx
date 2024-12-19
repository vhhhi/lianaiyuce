import React from 'react';
import { Layout } from 'antd';
import { TestingEntry } from './components/Navigation/TestingEntry';
import styles from './index.module.css';

const { Header, Content, Footer } = Layout;

const HomePage: React.FC = () => {
  return (
    <Layout className={styles.homePage}>
      <Header className={styles.header}>
        <h1>Love Match</h1>
      </Header>

      <Content className={styles.content}>
        {/* 测评入口部分 */}
        <section className={styles.section}>
          <TestingEntry />
        </section>
      </Content>

      <Footer className={styles.footer}>
        Love Match ©2024 Created by Your Team
      </Footer>
    </Layout>
  );
};

export default HomePage;
