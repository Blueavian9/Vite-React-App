import { ReactElement } from 'react';

interface CardProps {
  title: string;
  body: string;
  userId: number;
  id: number;
}

export const Card = ({ title, body, userId, id } : CardProps) : ReactElement => {
  return (
    <div className="card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p>{body}</p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <span>User ID: {userId}</span>
        <span>Post ID: {id}</span>
      </div>
    </div>
  );
};