import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TestEntry } from './types';
import styles from './TestingEntryCard.module.css';

export const TestingEntryCard: React.FC<TestEntry> = ({
  title,
  description,
  icon,
  path
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Card 
      className={styles.entryCard} 
      hoverable 
      onClick={handleClick}
    >
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}; 