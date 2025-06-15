import {
  Container,
  FeedWrapper,
  Feed,
  FeedHeader,
  PostBox,
  UserAvatar,
  PlaceholderText,
  PostButton,
  PostText,
  SearchInput,
  SearchResult,
  SearchAvatar,
  SearchUsername
} from './styles';

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
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
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
    if (!newPostContent.trim() && !newPostImage) return;
    const formData = new FormData();
    formData.append('content', newPostContent);
    if (newPostImage) formData.append('image', newPostImage);
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
      setNewPostImage(null);
    } catch (err) {
      console.error('Erro ao postar:', err);
    }
  };

  return (
    <Container>
      <Sidebar />
      <FeedWrapper>
        <Feed>
          <SearchInput
            type="text"
            placeholder="Digite o nome de alguém..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div>
              {searchResults.map(user => (
                <SearchResult key={user.id} to={`/users/${user.username}`}>
                  <SearchAvatar src={getAvatarUrl(user.avatar)} alt={user.username} />
                  <SearchUsername>@{user.username}</SearchUsername>
                </SearchResult>
              ))}
            </div>
          )}

          <FeedHeader>
            <PostBox>
              <UserAvatar src={getAvatarUrl(user?.avatar)} alt="User" />
              <PlaceholderText
                placeholder="No que você está pensando?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPostImage(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
                id="upload-img"
              />
              <label htmlFor="upload-img" style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#2f81f7' }}>📎</label>
              <PostButton onClick={handleCreatePost}>Postar</PostButton>
            </PostBox>
          </FeedHeader>

          <UserSuggestions />

          {loading ? (
            <PostText>Carregando...</PostText>
          ) : posts.length === 0 ? (
            <PostText>Você ainda não tem nenhuma postagem no feed.</PostText>
          ) : (
            posts.map(post => <PostItem key={post.id} post={post} />)
          )}
        </Feed>
        <Footer />
      </FeedWrapper>
    </Container>
  );
}