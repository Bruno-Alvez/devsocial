import {
  Container,
  Sidebar,
  Header,
  Divider,
  FeedWrapper,
  Feed,
  NavItem,
  SidebarUser,
  SidebarAvatar,
  FeedHeader,
  PostBox,
  UserAvatar,
  PlaceholderText,
  PostButton,
  PostText
} from './styles';

import {
  FiHome,
  FiUser,
  FiFileText,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';

import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserFeed } from '../../api/posts';
import { Link } from 'react-router-dom';
import PostItem from '../../components/PostItem';

export default function HomePage() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchUserFeed(token);
        setPosts(data);
      } catch (err: any) {
        console.error('Failed to load feed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadFeed();
    }
  }, [token]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !newPostImage) return;

    const formData = new FormData();
    formData.append('content', newPostContent);
    if (newPostImage) formData.append('image', newPostImage);

    try {
      const response = await fetch('http://localhost:8000/api/v1/posts/', {
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
      <Sidebar>
        <Header>{'</> devSocial'}</Header>
        <Divider />
        <SidebarUser>
          <SidebarAvatar src={user?.profile_picture || '/profile-user.png'} alt="User" />
          <span>@{user?.username}</span>
        </SidebarUser>

        <NavItem><FiHome /> Início</NavItem>
        <NavItem><FiUser /> Perfil</NavItem>
        <NavItem as={Link} to="/my-posts"><FiFileText />Publicações</NavItem>
        <NavItem><FiBell /> Notificações</NavItem>
        <NavItem><FiLogOut /> Sair</NavItem>
      </Sidebar>

      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <PostBox>
              <UserAvatar src={user?.profile_picture || '/profile-user.png'} alt="User" />
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

          {loading ? (
            <PostText>Carregando...</PostText>
          ) : posts.length === 0 ? (
            <PostText>Você ainda não tem nenhuma postagem no feed. Siga alguém para ver o que ela está pensando.</PostText>
          ) : (
            posts.map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))
          )}
        </Feed>
        <Footer />
      </FeedWrapper>
    </Container>
  );
}
