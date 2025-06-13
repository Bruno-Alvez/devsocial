import styled from 'styled-components';

export const CarouselContainer = styled.div`
  margin-bottom: 2rem;
`;

export const CarouselTitle = styled.h3`
  color: #c9d1d9;
  margin-bottom: 1rem;
`;

export const SuggestionsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 3px;
  }
`;

export const SuggestionCard = styled.div`
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 0.75rem;
  min-width: 150px;
  text-align: center;
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

export const Username = styled.p`
  color: #2f81f7;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const FollowButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background-color: #238636;
  color: white;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #2ea043;
  }
`;
