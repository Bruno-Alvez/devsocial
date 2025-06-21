import * as S from './styles';

import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserFeed } from '../../api/posts';
import PostItem from '../../components/PostItem';
import Sidebar from '../../components/Sidebar';
import UserSuggestions from '../../components/UserSuggestions';
import { getAvatarUrl } from '../../utils/avatarUtils';

export default function HomePage() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchUserFeed(token as string);
        setPosts(data);
      } catch (err) {
        console.error('Failed to load feed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadFeed();
  }, [token]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetch(`${import.meta.env.VITE_API_URL}/users/search/?search=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(setSearchResults)
          .catch(console.error);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, token]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    const formData = new FormData();
    formData.append('content', newPostContent);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Erro ao criar post');
      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setNewPostContent('');
    } catch (err) {
      console.error('Erro ao postar:', err);
    }
  };

  return (
    <S.Container>
      <Sidebar />
      <S.FeedWrapper>
        <S.Feed>
          <S.SearchInput
            type="text"
            placeholder="Digite o nome de alguém..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div>
              {searchResults.map(user => (
                <S.SearchResult key={user.id} to={`/users/${user.username}`}>
                  <S.SearchAvatar src={getAvatarUrl(user.avatar)} alt={user.username} />
                  <S.SearchUsername>@{user.username}</S.SearchUsername>
                </S.SearchResult>
              ))}
            </div>
          )}

          <S.FeedHeader>
            <S.PostBox>
              <S.UserAvatar src={getAvatarUrl(user?.avatar)} alt="User" crossOrigin='anonymous'/>
              <S.PlaceholderText
                placeholder="No que você está pensando?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <label htmlFor="upload-img" style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#2f81f7' }}>📎</label>
              <S.PostButton onClick={handleCreatePost}>Postar</S.PostButton>
            </S.PostBox>
          </S.FeedHeader>

          <UserSuggestions />

          {loading ? (
            <S.PostText>Carregando...</S.PostText>
          ) : posts.length === 0 ? (
            <S.PostText>Você ainda não tem nenhuma postagem no feed, publique ou siga algúem pra atualizar seu feed.</S.PostText>
          ) : (
            posts.map(post => <PostItem key={post.id} post={post} />)
          )}
        </S.Feed>
        <Footer />
      </S.FeedWrapper>
    </S.Container>
  );
}