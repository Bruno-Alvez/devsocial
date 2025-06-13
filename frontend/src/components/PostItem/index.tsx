import {
  PostCard,
  Avatar,
  Content,
  Username,
  Timestamp,
  PostText,
  PostImage,
  DeleteButton,
  LikeButton,
  LikesCount
} from './styles';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiHeart, FiThumbsDown } from 'react-icons/fi';
import { getAvatarUrl } from '../../utils/avatarUtils';

interface PostItemProps {
  post: {
    id: number;
    content: string;
    image?: string | null;
    created_at: string;
    likes_count: number;
    author: {
      username: string;
      avatar?: string | null;
    };
  };
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export default function PostItem({ post, showDeleteButton = false, onDelete }: PostItemProps) {
  const { token } = useAuth();
  const apiBase = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const handleLike = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${post.id}/like/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.detail === 'Post liked') {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else if (data.detail === 'Post unliked') {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir:', error);
    }
  };

  return (
    <PostCard>
      <Avatar src={getAvatarUrl(post.author.avatar)} alt="Avatar do autor" />
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

        {post.image && (
          <PostImage
            src={post.image.startsWith('http') ? post.image : `${apiBase}${post.image}`}
            alt="Imagem do post"
          />
        )}

        <LikesCount>{likesCount} curtidas</LikesCount>

        <LikeButton onClick={handleLike}>
          {liked ? <FiThumbsDown /> : <FiHeart />}
          {liked ? 'Descurtir' : 'Curtir'}
        </LikeButton>

        {showDeleteButton && (
          <DeleteButton onClick={onDelete}>Excluir publicação</DeleteButton>
        )}
      </Content>
    </PostCard>
  );
}
