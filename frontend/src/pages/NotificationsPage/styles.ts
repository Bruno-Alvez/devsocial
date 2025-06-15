import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117, #161b22);
  color: #c9d1d9;
  font-family: 'Segoe UI', sans-serif;
`;

export const FeedWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export const Feed = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    font-size: 1.8rem;
    color: #58a6ff;
    margin-bottom: 1rem;
  }
`;

export const PostCard = styled.div`
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Username = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #2f81f7;
`;

export const Timestamp = styled.p`
  font-size: 0.85rem;
  color: #8b949e;
  margin-top: 0.25rem;
`;

export const PostText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e6edf3;
`;
