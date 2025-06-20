import styled from 'styled-components';

export const PostCard = styled.div`
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
  color: #2f81f7;
  font-size: 1rem;
`;

export const Timestamp = styled.p`
  font-size: 0.85rem;
  color: #8b949e;
  margin-bottom: 0.5rem;
`;

export const PostText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e6edf3;
`;

export const PostImage = styled.img`
  width: 50%;
  height: auto;
  margin-top: 0.75rem;
  border-radius: 10px;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #ef444420;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;


export const LikeButton = styled.button`
  background-color: transparent;
  color: #2f81f7;
  border: 1px solid #2f81f7;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    background-color: #2f81f710;
  }
`;

export const LikesCount = styled.p`
  font-size: 0.85rem;
  color: #8b949e;
  margin-top: 0.5rem;
`;

export const CommentToggleButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  color: #2f81f7;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #c9d1d9;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #21262d;
  }
`;
