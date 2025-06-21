import * as S from './styles'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const { token } = useAuth()
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      alert('Você não está autenticado.')
      return
    }

    const formData = new FormData()
    formData.append('content', content)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) throw new Error('Erro ao criar post')
      navigate('/my-posts')
    } catch (err) {
      console.error('Erro ao publicar:', err)
    }
  }

  return (
    <S.Container>
      <S.Sidebar />
      <S.FeedWrapper>
        <S.Feed>
          <S.FeedHeader>
            <h2 style={{ fontSize: '1.3rem', color: '#e6edf3' }}>Criar nova publicação</h2>
          </S.FeedHeader>

          <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor="content">Texto da publicação</S.Label>
            <S.TextArea
              id="content"
              placeholder="No que você está pensando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <S.SubmitButton type="submit">Publicar</S.SubmitButton>
          </S.Form>
        </S.Feed>
      </S.FeedWrapper>
    </S.Container>
  )
}
