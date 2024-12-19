import React from 'react';
import { Row, Col } from 'antd';
import { ExpertCard } from './ExpertCard';
import { Expert } from './types';
import styles from './index.module.css';

export const ExpertTeam: React.FC = () => {
  const experts: Expert[] = [
    {
      id: 1,
      name: '张医生',
      title: '心理咨询师',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=male&id=1',
      description: '从业20年，专注于情感心理咨询，帮助众多情侣解决感情问题。',
      specialties: ['婚恋咨询', '情感修复', '人格测评']
    },
    {
      id: 2,
      name: '李教授',
      title: '情感专家',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=female&id=2',
      description: '资深情感专家，著有多部情感关系著作，擅长解决复杂情感问题。',
      specialties: ['关系治疗', '婚姻咨询', '情感教育']
    },
    {
      id: 3,
      name: '王博士',
      title: '心理学博士',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=male&id=3',
      description: '心理学博士，专注于人际关系研究，开发多个成功的情感测评模型。',
      specialties: ['心理测评', '关系分析', '性格研究']
    },
    {
      id: 4,
      name: '陈老师',
      title: '情感导师',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=female&id=4',
      description: '知名情感导师，擅长约会技巧指导和恋爱心理辅导。',
      specialties: ['约会指导', '恋爱心理', '自我提升']
    }
  ];

  return (
    <div className={styles.expertTeam}>
      <h2 className={styles.sectionTitle}>专家团队</h2>
      <p className={styles.sectionDesc}>专业的团队为您的感情保驾护航</p>
      
      <Row gutter={[24, 24]}>
        {experts.map(expert => (
          <Col xs={24} sm={12} md={6} key={expert.id}>
            <ExpertCard {...expert} />
          </Col>
        ))}
      </Row>
    </div>
  );
}; 