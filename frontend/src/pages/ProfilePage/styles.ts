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

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #c9d1d9;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;

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
  gap: 3rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

export const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2f81f7;
`;

export const DividerVertical = styled.div`
  width: 1px;
  height: auto;
  background-color: #30363d;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const Username = styled.h2`
  color: #2f81f7;
  font-size: 1.3rem;
`;

export const InfoLabel = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #8b949e;
`;

export const InfoValue = styled.p`
  font-size: 1rem;
  color: #e6edf3;
  margin-bottom: 0.3rem;
`;

export const InputField = styled.input`
  background-color: #0d1117;
  border: 1px solid #30363d;
  color: #c9d1d9;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const EditButton = styled.button`
  background-color: transparent;
  color: #2f81f7;
  border: 1px solid #2f81f7;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: #1f6feb33;
  }
`;

export const UploadInput = styled.input`
  margin-top: 0.5rem;
  background-color: #161b22;
  color: #e6edf3;
  border: none;

  &::-webkit-file-upload-button {
    background-color: #2f81f7;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 0.8rem;
  }

  &::-webkit-file-upload-button:hover {
    background-color: #1f6feb;
  }
`;

export const SuccessMessage = styled.p`
  color: #3fb950;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

export const BottomActions = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  margin-right: 9.4rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ActionButton = styled.button<{ primary?: boolean; danger?: boolean }>`
  background-color: ${({ primary, danger }) =>
    primary ? '#2f81f7' : danger ? '#ef4444' : '#30363d'};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    opacity: 0.9;
  }
`;
