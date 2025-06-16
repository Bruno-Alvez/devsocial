import * as S from './styles';

import {
  FiPlus,
} from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../../components/PostItem';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';

export default function MyPosts() {
  const { token } = useAuth();
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
    <S.Container>
      <Sidebar/>
      <S.FeedWrapper>
        <S.Feed>
          <S.FeedHeader>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#e6edf3' }}>Minhas Publicações</h2>
            <S.CreateButton as={Link} to="/post/new">
              <FiPlus style={{ marginRight: '0.5rem' }} /> Nova publicação
            </S.CreateButton>
          </S.FeedHeader>

          {loading ? (
            <S.PostText>Carregando...</S.PostText>
          ) : myPosts.length === 0 ? (
            <S.PostText>Você ainda não publicou nada.</S.PostText>
          ) : (
            myPosts.map((post) => (
              <PostItem key={post.id} post={post} showDeleteButton onDelete={() => handleDelete(post.id)} />
            ))
          )}
        </S.Feed>
      </S.FeedWrapper>
      <Footer />
    </S.Container>
  );
}
