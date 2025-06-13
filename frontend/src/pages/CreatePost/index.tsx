import {
  Container,
  Sidebar,
  FeedWrapper,
  Feed,
  FeedHeader,
  Form,
  Label,
  TextArea,
  SubmitButton,
  FileInputWrapper,
  HiddenInput,
  UploadLabel,
} from './styles';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { token } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


  if (!token) {
    alert('Você não está autenticado.');
    return;
  }

  console.log('Token enviado no POST:', token);


    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    

    try {
      const response = await fetch('http://localhost:8000/api/v1/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao criar post');
      navigate('/my-posts');
    } catch (err) {
      console.error('Erro ao publicar:', err);
    }
  };

  return (
    <Container>
      <Sidebar />
      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <h2 style={{ fontSize: '1.3rem', color: '#e6edf3' }}>Criar nova publicação</h2>
          </FeedHeader>

          <Form onSubmit={handleSubmit}>
            <Label htmlFor="content">Texto da publicação</Label>
            <TextArea
              id="content"
              placeholder="No que você está pensando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Label htmlFor="image">Adicione uma imagem a publicação (Opcional)</Label>
            <FileInputWrapper>
                <HiddenInput
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setImage(file);
                    }}
                />
                <UploadLabel htmlFor="image">
                    <img src="/photo.png" alt="Upload" />
                </UploadLabel>
            </FileInputWrapper>

            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt="Pré-visualização"
                    style={{
                        marginTop: '1rem',
                        maxWidth: '100%',
                        borderRadius: '10px',
                        border: '1px solid #30363d'
                    }}
                />
)}


            <SubmitButton type="submit">Publicar</SubmitButton>
          </Form>
        </Feed>
      </FeedWrapper>
    </Container>
  );
}
