import styled from 'styled-components'

export const CommentContainer = styled.div`
  margin-top: 1rem;
  padding-left: 0.5rem;
  border-left: 2px solid #30363d;
`

export const CommentItem = styled.div`
  background-color: #0d1117;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  border: 1px solid #30363d;
`

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`

export const CommentAuthor = styled.span`
  font-weight: bold;
  color: #58a6ff;
`

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #8b949e;
`

export const CommentText = styled.p`
  color: #c9d1d9;
  font-size: 0.95rem;
  line-height: 1.4;
`
