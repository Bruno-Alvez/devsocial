import styled from 'styled-components'

export const CommentContainer = styled.div`
  margin-top: 1rem;
`

export const CommentBoxWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const ToggleButton = styled.button`
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
  margin-bottom: 1.04rem;


  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #21262d;
  }
`;

export const CommentForm = styled.form`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #30363d;
  border-radius: 8px;
  background-color: #0d1117;
  color: #e6edf3;
  resize: vertical;
  font-size: 0.95rem;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #2f81f7;
  }
`

export const SubmitButton = styled.button`
  background-color: #2ea043;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #238636;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const CancelButton = styled.button`
  background: none;
  border: none;
  color: #f85149;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`
export const FeedbackMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #58a6ff;
`;