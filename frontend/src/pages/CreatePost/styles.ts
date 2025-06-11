import styled from 'styled-components';

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
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  background-color: #161b22;
  border: 1px solid #30363d;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  color: #e6edf3;
`;

export const TextArea = styled.textarea`
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  color: #c9d1d9;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border: 1px solid #2f81f7;
  }
`;

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 0.5rem;
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: 0.2s;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: #21262d;
  }
`;


export const SubmitButton = styled.button`
  background-color: #2f81f7;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #1f6feb;
  }
`;
