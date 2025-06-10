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
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Credenciais inválidas');
      }

      login(data.access, data.user);
      navigate('/');
    } catch {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo>{'</> devSocial'}</Logo>
        <Title>Bem vindo de volta</Title>

        <InputWrapper>
          <InputIcon>👤</InputIcon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

        <Button type="submit">Entrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <p style={{ marginTop: '1rem', color: '#8b949e', fontSize: '0.95rem' }}>
            Novo por aqui?{' '}
          <Link to="/register" style={{ color: '#2f81f7', textDecoration: 'none' }}>
            Cadastre-se
          </Link>
        </p>

      </Form>
    </Container>
  );
}
