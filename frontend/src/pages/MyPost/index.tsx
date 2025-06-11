import {
  Container,
  Sidebar,
  Header,
  Divider,
  SidebarUser,
  SidebarAvatar,
  NavItem,
  FeedWrapper,
  Feed,
  PostText,
  CreateButton,
  FeedHeader,
} from './styles';

import {
  FiHome,
  FiUser,
  FiFileText,
  FiBell,
  FiLogOut,
  FiPlus,
} from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../../components/PostItem';
import Footer from '../../components/Footer';

export default function MyPosts() {
  const { token, user } = useAuth();
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/posts/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Erro ao buscar seus posts');
        const data = await response.json();
        setMyPosts(data);
      } catch (err) {
        console.error('Erro ao carregar meus posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMyPosts();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta publicação?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/posts/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao excluir');

      setMyPosts(myPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
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

        <NavItem as={Link} to="/"><FiHome /> Início</NavItem>
        <NavItem as={Link} to="/profile"><FiUser /> Perfil</NavItem>
        <NavItem as={Link} to="/my-posts"><FiFileText /> Publicações</NavItem>
        <NavItem as={Link} to="/notifications"><FiBell /> Notificações</NavItem>
        <NavItem><FiLogOut /> Sair</NavItem>
      </Sidebar>

      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#e6edf3' }}>Minhas Publicações</h2>
            <CreateButton as={Link} to="/post/new">
              <FiPlus style={{ marginRight: '0.5rem' }} /> Nova publicação
            </CreateButton>
          </FeedHeader>

          {loading ? (
            <PostText>Carregando...</PostText>
          ) : myPosts.length === 0 ? (
            <PostText>Você ainda não publicou nada.</PostText>
          ) : (
            myPosts.map((post) => (
              <PostItem key={post.id} post={post} showDeleteButton onDelete={() => handleDelete(post.id)} />
            ))
          )}
        </Feed>
      </FeedWrapper>
      <Footer />
    </Container>
  );
}
