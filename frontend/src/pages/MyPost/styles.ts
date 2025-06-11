import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117, #161b22);
  color: #c9d1d9;
  font-family: 'Segoe UI', sans-serif;
`;

export const Sidebar = styled.aside`
  width: 280px;
  padding: 2rem 1.5rem;
  border-right: 1px solid #30363d;
  background-color: #0d1117;
`;

export const Header = styled.h1`
  font-size: 1.5rem;
  font-family: 'Fira Code', monospace;
  color: #2f81f7;
  margin-bottom: 1.5rem;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #30363d;
  margin: 1rem 0;
`;

export const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  span {
    margin-left: 0.8rem;
    font-weight: bold;
    color: #e6edf3;
  }
`;

export const SidebarAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #c9d1d9;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  text-decoration: none;

  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #21262d;
  }
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

export const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CreateButton = styled(Link)`
  background-color: #2f81f7;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  color: #fff;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: #1f6feb;
  }
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

export const DeleteButton = styled.button`
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #ef444420;
  }
`;
