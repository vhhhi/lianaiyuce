import React from 'react';
import { Card, Rate } from 'antd';
import { Story } from './types';
import styles from './StoryCard.module.css';

export const StoryCard: React.FC<Story> = ({
  title,
  content,
  image,
  author,
  rating
}) => {
  return (
    <Card className={styles.storyCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.content}>{content}</p>
          <div className={styles.footer}>
            <span className={styles.author}>{author}</span>
            <Rate disabled defaultValue={rating} className={styles.rating} />
          </div>
        </div>
      </div>
    </Card>
  );
}; 