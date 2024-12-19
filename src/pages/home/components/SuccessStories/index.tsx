import React, { useState } from 'react';
import { Carousel } from 'antd';
import { StoryCard } from './StoryCard';
import { Story } from './types';
import styles from './index.module.css';

export const SuccessStories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const stories: Story[] = [
    {
      id: 1,
      title: '从相识到相恋',
      content: '通过Love Match的智能匹配系统，我找到了生命中的另一半。我们有着相似的价值观和人生目标，这让我们的感情更加稳固。',
      image: 'https://source.unsplash.com/400x300/?couple&id=1',
      author: '小王',
      rating: 5
    },
    {
      id: 2,
      title: '重获幸福',
      content: '在经历了一段失败的感情后，Love Match帮助我重新认识自己，找到了更适合的伴侣。现在我们已经结婚一年了。',
      image: 'https://source.unsplash.com/400x300/?couple&id=2',
      author: '小李',
      rating: 5
    },
    {
      id: 3,
      title: '跨越距离的爱情',
      content: '尽管我们相隔两个城市，但通过平台的匹配和线上交流，我们建立了深厚的感情。现在我们已经在同一个城市工作生活。',
      image: 'https://source.unsplash.com/400x300/?couple&id=3',
      author: '小张',
      rating: 5
    }
  ];

  return (
    <div className={styles.successStories}>
      <h2 className={styles.sectionTitle}>成功案例</h2>
      <p className={styles.sectionDesc}>听听他们的故事</p>
      
      <Carousel
        autoplay
        effect="fade"
        afterChange={setActiveIndex}
        className={styles.carousel}
      >
        {stories.map(story => (
          <div key={story.id}>
            <StoryCard {...story} />
          </div>
        ))}
      </Carousel>
      
      <div className={styles.indicators}>
        {stories.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}; 