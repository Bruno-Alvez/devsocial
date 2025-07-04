import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FiHeart, FiThumbsDown, FiMessageCircle } from 'react-icons/fi'
import { getAvatarUrl } from '../../utils/avatarUtils'
import { CommentBox } from '../CommentBox'
import { CommentList } from '../CommentList'
import * as S from './styles'

interface Comment {
  id: number
  content: string
  author_username: string
  created_at: string
}

interface PostItemProps {
  post: {
    id: number
    content: string
    created_at: string
    likes_count: number
    author: {
      username: string
      avatar?: string | null
    }
    comments?: Comment[]
  }
  showDeleteButton?: boolean
  onDelete?: () => void
}

export default function PostItem({ post, showDeleteButton = false, onDelete }: PostItemProps) {
  const { token } = useAuth()

  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [showComments, setShowComments] = useState(false)
  const [localComments, setLocalComments] = useState<Comment[]>(post.comments || [])

  const handleToggleComments = () => {
    setShowComments((prev) => !prev)
  }

  const handleNewComment = (newComment: Comment) => {
    setLocalComments((prev) => [newComment, ...prev])
  }

  const handleLike = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${post.id}/like/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (data.detail === 'Post liked') {
        setLiked(true)
        setLikesCount((prev) => prev + 1)
      } else if (data.detail === 'Post unliked') {
        setLiked(false)
        setLikesCount((prev) => prev - 1)
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir:', error)
    }
  }

  return (
    <S.PostCard>
      <S.Avatar src={getAvatarUrl(post.author.avatar)} alt="Avatar do autor" crossOrigin='anonymous' />
      <S.Content>
        <S.Username>@{post.author.username}</S.Username>
        <S.Timestamp>
          {new Date(post.created_at).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </S.Timestamp>

        <S.PostText>{post.content}</S.PostText>

        <S.LikesCount>{likesCount} curtidas</S.LikesCount>

        <S.ActionRow>
          <S.ActionButton onClick={handleLike}>
            {liked ? <FiThumbsDown /> : <FiHeart />}
            {liked ? 'Descurtir' : 'Curtir'}
          </S.ActionButton>

          <S.ActionButton onClick={handleToggleComments}>
            <FiMessageCircle />
            {showComments ? 'Ocultar comentários' : 'Ver comentários'}
          </S.ActionButton>

          <CommentBox postId={post.id} onCommentAdded={handleNewComment} />
        </S.ActionRow>

        {showComments && <CommentList post={{ id: post.id }} newComment={localComments[0]} />}

        {showDeleteButton && (
          <S.DeleteButton onClick={onDelete}>Excluir publicação</S.DeleteButton>
        )}
      </S.Content>
    </S.PostCard>
  )
}
