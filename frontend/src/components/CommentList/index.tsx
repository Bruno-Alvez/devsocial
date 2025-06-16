import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import * as S from './styles'

interface Comment {
  id: number
  content: string
  author_username: string
  created_at: string
}

interface CommentListProps {
  post: {
    id: number
  }
  newComment?: Comment // opcional: para exibir em tempo real se quiser
}

export const CommentList = ({ post, newComment }: CommentListProps) => {
  const { token } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${post.id}/comments/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setComments(res.data)
      } catch (err) {
        console.error('Erro ao buscar comentários:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [post.id, token])

  useEffect(() => {
    if (newComment) {
      setComments((prev) => [newComment, ...prev])
    }
  }, [newComment])

  if (loading) return <p>Carregando comentários...</p>

  return (
    <S.CommentContainer>
      {comments.map((comment) => (
        <S.CommentItem key={comment.id}>
          <S.CommentHeader>
            <S.CommentAuthor>@{comment.author_username}</S.CommentAuthor>
            <S.CommentDate>
              {new Date(comment.created_at).toLocaleString('pt-BR')}
            </S.CommentDate>
          </S.CommentHeader>
          <S.CommentText>{comment.content}</S.CommentText>
        </S.CommentItem>
      ))}
    </S.CommentContainer>
  )
}
