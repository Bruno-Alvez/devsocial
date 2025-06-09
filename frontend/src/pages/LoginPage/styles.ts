import styled from 'styled-components';

export const Container = styled.div`
  background-color: #0d1117;
  background-image: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Form = styled.form`
  backdrop-filter: blur(14px);
  background: rgba(22, 27, 34, 0.6);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  max-width: 400px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  color: #2f81f7;
  font-weight: bold;
  margin-bottom: 1.5rem;
  user-select: none;
  font-family: 'Fira Code', monospace;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: #f0f6fc;
  white-space: nowrap;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
`;

export const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #8b949e;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.5rem;
  border-radius: 10px;
  background-color: rgba(13, 17, 23, 0.85);
  border: 1px solid #30363d;
  color: #e6edf3;
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2f81f7;
  }

  &::placeholder {
    color: #8b949e;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #2f81f7;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1f6feb;
  }
`;

export const ErrorMessage = styled.p`
  color: #f85149;
  font-size: 0.95rem;
  margin-top: 0.8rem;
`;
