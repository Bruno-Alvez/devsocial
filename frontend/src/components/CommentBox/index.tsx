import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { FiEdit2 } from 'react-icons/fi'
import * as S from './styles'

interface Comment {
  id: number
  content: string
  author_username: string
  created_at: string
}

interface CommentBoxProps {
  postId: number
  onCommentAdded?: (newComment: Comment) => void
}

export const CommentBox = ({ postId, onCommentAdded }: CommentBoxProps) => {
  const { token } = useAuth()
  const [showTextarea, setShowTextarea] = useState(false)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleToggle = () => {
    setShowTextarea(!showTextarea)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setLoading(true)
    try {
      const response = await axios.post<Comment>(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comment/`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const createdComment = response.data

      setComment('')
      setShowTextarea(false)
      setFeedback('Comentário enviado com sucesso!')

      if (onCommentAdded) onCommentAdded(createdComment)
    } catch (err) {
      console.error('Erro ao comentar:', err)
      setFeedback('Erro ao enviar comentário')
    } finally {
      setLoading(false)
      setTimeout(() => setFeedback(''), 3000)
    }
  }

  return (
    <S.CommentContainer>
      <S.ToggleButton onClick={handleToggle}>
        <FiEdit2 />
        Comentar
      </S.ToggleButton>

      {showTextarea && (
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentTextarea
            placeholder="Digite seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </S.SubmitButton>
          <S.CancelButton type="button" onClick={() => setShowTextarea(false)}>
            Cancelar
          </S.CancelButton>
        </S.CommentForm>
      )}

      {feedback && <S.FeedbackMessage>{feedback}</S.FeedbackMessage>}
    </S.CommentContainer>
  )
}
