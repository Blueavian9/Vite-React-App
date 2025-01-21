import { ReactElement } from 'react';
import { Card } from './Card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface CardListProps {
  posts: Post[];
}

export const CardList = ({ posts }: CardListProps) : ReactElement => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '16px',
      justifyContent: 'center'
    }}>
      {posts.map(post => (
        <Card
          key={post.id}
          title={post.title}
          body={post.body}
          userId={post.userId}
          id={post.id}
        />
      ))}
    </div>
  );
};