import * as S from './styles';

import { useState, useEffect} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login/`, {
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

  useEffect(() => {
  const registered = localStorage.getItem('registerSuccess');
  if (registered) {
    setSuccessMessage('Cadastro realizado com sucesso. Faça o login para continuar.');
    localStorage.removeItem('registerSuccess');
  }
  }, []);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
        <S.Logo>{'</> devSocial'}</S.Logo>
        <S.Title>Bem vindo de volta</S.Title>

        <S.InputWrapper>
          <S.InputIcon>👤</S.InputIcon>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.InputIcon>🔒</S.InputIcon>
          <S.Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </S.InputWrapper>

        <S.Button type="submit">Entrar</S.Button>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <p style={{ marginTop: '1rem', color: '#8b949e', fontSize: '0.95rem' }}>
            Novo por aqui?{' '}
          <Link to="/register" style={{ color: '#2f81f7', textDecoration: 'none' }}>
            Cadastre-se
          </Link>
        </p>

      </S.Form>
      <Footer />
    </S.Container>
  );
}
