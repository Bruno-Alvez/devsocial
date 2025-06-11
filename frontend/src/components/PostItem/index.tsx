import {
  PostCard,
  Avatar,
  Content,
  Username,
  Timestamp,
  PostText,
  PostImage,
  DeleteButton
} from './styles';

interface PostItemProps {
  post: {
    id: number;
    content: string;
    image?: string;
    created_at: string;
    author: {
      username: string;
      profile_picture?: string;
    };
  };
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export default function PostItem({ post, showDeleteButton = false, onDelete }: PostItemProps) {
  const apiBase = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

  console.log('🖼️ post.image:', post.image);

  return (
    <PostCard>
      <Avatar src={post.author.profile_picture || '/profile-user.png'} alt="Avatar do autor" />
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

        {showDeleteButton && (
          <DeleteButton onClick={onDelete}>Excluir publicação</DeleteButton>
        )}
      </Content>
    </PostCard>
  );
}
