import styled from "styled-components";

export const SidebarContainer = styled.aside`
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
`
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