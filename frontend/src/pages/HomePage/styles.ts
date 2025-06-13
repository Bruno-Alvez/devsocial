import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

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

export const FeedHeader = styled.div`
  margin-bottom: 2rem;
`;

export const PostBox = styled.div`
  background-color: #161b22;
  padding: 1rem;
  border: 1px solid #30363d;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const PlaceholderText = styled.input`
  flex: 1;
  padding: 0.7rem;
  border-radius: 8px;
  border: none;
  background-color: #0d1117;
  color: #e6edf3;

  &:focus {
    outline: none;
    background-color: #0d1117;
    border: 1px solid #2f81f7;
  }
`;

export const PostButton = styled.button`
  margin-left: 1rem;
  background-color: #2f81f7;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1f6feb;
  }
`;


export const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: #c9d1d9;
`;

export const SearchResultCard = styled.div`
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchResultAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const SearchResultName = styled.span`
  color: #e6edf3;
  font-weight: bold;
`;


export const SearchResult = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background-color: #0d1117;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 8px;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #21262d;
  }
`;

export const SearchAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SearchUsername = styled.span`
  font-weight: 500;
  color: #58a6ff;
  font-size: 1rem;
`;


