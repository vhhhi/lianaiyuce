import React from 'react';
import { Card } from 'antd';
import { Feature } from './types';
import styles from './FeatureCard.module.css';

export const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => {
  return (
    <Card className={styles.featureCard} hoverable>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}; 