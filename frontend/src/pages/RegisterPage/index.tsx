import {
  Container,
  Form,
  Logo,
  Title,
  Input,
  InputWrapper,
  InputIcon,
  Button,
  ErrorMessage,
} from './styles';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erro ao registrar usuário.');
      }

      localStorage.setItem('registerSuccess', 'true');
      navigate('/login');

    } catch {
      setError('Erro no registro. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Logo>{'</> devSocial'}</Logo>
        <Title>Crie sua conta</Title>

        <InputWrapper>
          <InputIcon>📧</InputIcon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <InputIcon>👤</InputIcon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <InputIcon>📝</InputIcon>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <InputIcon>🔒</InputIcon>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </InputWrapper>

        <Button type="submit">Registrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <p style={{ marginTop: '1rem', color: '#8b949e', fontSize: '0.95rem' }}>
            Já possui conta?{' '}
          <Link to="/login" style={{ color: '#2f81f7', textDecoration: 'none' }}>
            Faça login
          </Link>
        </p>


      </Form>
      <Footer />
    </Container>
  );
}
