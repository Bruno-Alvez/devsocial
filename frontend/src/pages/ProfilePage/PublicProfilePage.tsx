import {
  Container,
  FeedWrapper,
  Feed,
  FeedHeader,
  ProfileAvatar,
  ProfileInfo,
  Username,
  InfoLabel,
  InfoValue,
  ProfileColumn,
  DividerVertical
} from './styles';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';

interface ProfileData {
  id?: number;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  birth_date?: string;
  avatar?: string | null;
}

export default function PublicProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (!username) return;
    fetch(`${import.meta.env.VITE_API_URL}/users/${username}/public/`)
      .then(res => res.json())
      .then(data => {
        const formatted = {
          ...data,
          birth_date: data.birth_date
            ? new Date(data.birth_date).toLocaleDateString('pt-BR')
            : '',
        };
        setProfile(formatted);
      })
      .catch(console.error);
  }, [username]);

  if (!profile) return null;

  const apiBase = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  const avatarSrc = profile.avatar
    ? (profile.avatar.startsWith('http') ? profile.avatar : `${apiBase}${profile.avatar}`)
    : '/profile-user.png';

  const renderField = (label: string, value: string | undefined) => (
    <div>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value || '-'}</InfoValue>
    </div>
  );

  return (
    <Container>
      <Sidebar />
      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <ProfileColumn>
              <ProfileAvatar src={avatarSrc} alt="Avatar" />
            </ProfileColumn>

            <DividerVertical />

            <ProfileInfo>
              <Username>@{profile.username}</Username>
              {renderField('Bio:', profile.bio)}
              {renderField('Email:', profile.email)}
              {renderField('Localização:', profile.location)}
              {renderField('Nascimento:', profile.birth_date)}
            </ProfileInfo>
          </FeedHeader>
          <Footer />
        </Feed>
      </FeedWrapper>
    </Container>
  );
}