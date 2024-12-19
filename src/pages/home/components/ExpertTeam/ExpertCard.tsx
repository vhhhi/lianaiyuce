import React from 'react';
import { Card, Tag } from 'antd';
import { Expert } from './types';
import styles from './ExpertCard.module.css';

export const ExpertCard: React.FC<Expert> = ({
  name,
  title,
  avatar,
  description,
  specialties
}) => {
  return (
    <Card className={styles.expertCard} hoverable>
      <div className={styles.avatarWrapper}>
        <img src={avatar} alt={name} className={styles.avatar} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>
      <div className={styles.specialties}>
        {specialties.map(specialty => (
          <Tag key={specialty} color="blue">{specialty}</Tag>
        ))}
      </div>
    </Card>
  );
}; 