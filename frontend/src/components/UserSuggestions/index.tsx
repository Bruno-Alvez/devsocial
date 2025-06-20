import { useEffect, useState } from 'react';
import * as S from './styles'
import { useAuth } from '../../contexts/AuthContext';
import { Link }  from 'react-router-dom';
import { getAvatarUrl } from '../../utils/avatarUtils';

interface User {
  id: number;
  username: string;
  avatar? : string | null
  is_following: boolean;
}

export default function UserSuggestions() {
  const { token } = useAuth();
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/suggestions/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(console.error);
  }, [token]);

  const toggleFollow = async (username: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/follow/${username}/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Erro ao seguir/deixar de seguir usuário');

      setSuggestions((prev) =>
        prev.map((user) =>
         user.username === username ? { ...user, is_following: !user.is_following } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <S.CarouselContainer>
      <S.CarouselTitle>👥 Sugestões para você</S.CarouselTitle>
      <S.SuggestionsWrapper>
        {suggestions.map((user) => (
          <S.SuggestionCard key={user.username}>
            <Link to={`/users/${user.username}`}>
              <S.Avatar src={getAvatarUrl(user.avatar)} />
              <S.Username>@{user.username}</S.Username>
            </Link>
            <S.FollowButton onClick={() => toggleFollow(user.username)}>
              {user.is_following ? 'Deixar de seguir' : 'Seguir'}
            </S.FollowButton>
          </S.SuggestionCard>
        ))}
      </S.SuggestionsWrapper>
    </S.CarouselContainer>
  );
}
