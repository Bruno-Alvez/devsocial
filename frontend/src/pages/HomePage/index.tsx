import {
  Container,
  Sidebar,
  Header,
  Divider,
  FeedWrapper,
  Feed,
  PostCard,
  Avatar,
  Content,
  Username,
  Timestamp,
  PostText,
  NavItem,
  SidebarUser,
  SidebarAvatar,
  FeedHeader,
  PostBox,
  UserAvatar,
  PlaceholderText,
  PostButton,
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

export default function HomePage() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchUserFeed(token);
        setPosts(data);
      } catch (err: any) {
        console.error('Failed to load feed:', err);
        // Optional: handle expired session or unauthorized
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadFeed();
    }
  }, [token]);

  return (
    <Container>
      <Sidebar>
        <Header>{'</> devSocial'}</Header>
        <Divider />
        <SidebarUser>
          <SidebarAvatar src={user?.profile_picture || '/default-avatar.png'} alt="User" />
          <span>@{user?.username}</span>
        </SidebarUser>

        <NavItem><FiHome /> Início</NavItem>
        <NavItem><FiUser /> Perfil</NavItem>
        <NavItem><FiFileText /> Meus Posts</NavItem>
        <NavItem><FiBell /> Notificações</NavItem>
        <NavItem><FiLogOut /> Sair</NavItem>
      </Sidebar>

      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <PostBox>
              <UserAvatar src={user?.profile_picture || '/default-avatar.png'} alt="User" />
              <PlaceholderText placeholder="No que você está pensando?" />
              <PostButton>Postar</PostButton>
            </PostBox>
          </FeedHeader>

          {loading ? (
            <PostText>Carregando...</PostText>
          ) : posts.length === 0 ? (
            <PostText> Você ainda não tem nenhuma postagem no feed. Siga alguém para ver o que ela está pensando.</PostText>
          ) : (
            posts.map((post: any) => (
              <PostCard key={post.id}>
                <Avatar src={post.author.profile_picture || '/default-avatar.png'} />
                <Content>
                  <Username>@{post.author.username}</Username>
                  <Timestamp>
                    {new Date(post.created_at).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Timestamp>
                  <PostText>{post.content}</PostText>
                </Content>
              </PostCard>
            ))
          )}
        </Feed>
        <Footer />
      </FeedWrapper>
    </Container>
  );
}
