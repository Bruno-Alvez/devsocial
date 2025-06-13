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
  InputField,
  EditButton,
  UploadInput,
  SuccessMessage,
  BottomActions,
  ActionButton,
  ProfileColumn,
  DividerVertical
} from './styles';

import {
  FiEdit, FiCheck, FiTrash2, FiX
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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

export default function ProfilePage() {
  const { token, logout, user, updateUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetch(`${import.meta.env.VITE_API_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  const isOwnProfile = profile?.username === user?.username;

  const handleSaveField = async (field: string, value: string) => {
    if (!token || !profile) return;

    let formattedValue = value;

    if (field === 'birth_date' && value.includes('/')) {
      const [day, month, year] = value.split('/');
      if (
        !/^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
        Number(day) > 31 || Number(month) > 12
      ) {
        setSuccessMessage('Data inválida. Use o formato DD/MM/AAAA');
        setTimeout(() => setSuccessMessage(''), 3000);
        return;
      }
      formattedValue = `${year}-${month}-${day}`;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: formattedValue }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      const updatedWithFormattedDate = {
        ...updated,
        birth_date: updated.birth_date
          ? new Date(updated.birth_date).toLocaleDateString('pt-BR')
          : '',
      };

      setProfile({ ...profile, ...updatedWithFormattedDate });
      setEditingField(null);
      setSuccessMessage(`Campo "${field}" salvo com sucesso!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      console.error('Falha ao salvar', field);
    }
  };

  const handleAvatarUpload = async () => {
    if (!token || !avatarFile) return;
    const form = new FormData();
    form.append('avatar', avatarFile);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      updateUser({ avatar: updated.avatar });

      setProfile({ ...profile, ...updated });
      setSuccessMessage('Foto de perfil atualizada com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      console.error('Falha ao atualizar avatar');
    }
  };

  const handleAvatarPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: null }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      updateUser({ avatar: null });
      setProfile({ ...profile, avatar: null } as ProfileData);
      setPreviewAvatar(null);
      setAvatarFile(null);
      setSuccessMessage('Foto de perfil removida com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      console.error('Erro ao remover avatar');
    }
  };

  const handleSaveAll = () => {
    if (!profile) return;
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!token) return;
    if (!confirm('Tem certeza que deseja excluir sua conta?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      logout();
      navigate('/login');
    } catch {
      console.error('Falha ao deletar conta');
    }
  };

  if (!profile) return null;

  const renderField = (label: string, field: keyof ProfileData) => (
    <div>
      <InfoLabel>{label}</InfoLabel>
      {isOwnProfile && editingField === field ? (
        <>
          <InputField
            value={profile[field] || ''}
            onChange={e => setProfile({ ...profile, [field]: e.target.value })}
          />
          <EditButton onClick={() => handleSaveField(field, String(profile[field] ?? ''))}>
            <FiCheck /> Salvar
          </EditButton>
        </>
      ) : (
        <>
          <InfoValue>{profile[field] || '-'}</InfoValue>
          {isOwnProfile && (
            <EditButton onClick={() => setEditingField(field)}>
              <FiEdit /> Editar
            </EditButton>
          )}
        </>
      )}
    </div>
  );

  const apiBase = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  const avatarPreviewSrc = previewAvatar || (profile.avatar ? (profile.avatar.startsWith('http') ? profile.avatar : `${apiBase}${profile.avatar}`) : '/profile-user.png');

  return (
    <Container>
      <Sidebar />
      <FeedWrapper>
        <Feed>
          <FeedHeader>
            <ProfileColumn>
              <ProfileAvatar src={avatarPreviewSrc} alt="Avatar" />
              {isOwnProfile && (
                <>
                  <UploadInput
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarPreview}
                  />
                  <EditButton onClick={handleAvatarUpload}>
                    <FiCheck /> Atualizar foto de perfil
                  </EditButton>
                  <EditButton onClick={handleRemoveAvatar}>
                    <FiX /> Remover foto
                  </EditButton>
                </>
              )}
            </ProfileColumn>

            <DividerVertical />

            <ProfileInfo>
              <Username>@{profile.username}</Username>
              {renderField('Bio: (Conte-nos sobre você)', 'bio')}
              {renderField('E-mail: Ex: (seuemail@seuemail.com)', 'email')}
              {renderField('Localização: Ex: (Cidade-Estado-País)', 'location')}
              {renderField('Nascimento: Ex: (DD/MM/AAAA)', 'birth_date')}
            </ProfileInfo>
          </FeedHeader>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          {isOwnProfile && (
            <BottomActions>
              <ActionButton primary onClick={handleSaveAll}>
                <FiCheck /> Salvar perfil
              </ActionButton>
              <ActionButton danger onClick={handleDeleteAccount}>
                <FiTrash2 /> Excluir conta
              </ActionButton>
            </BottomActions>
          )}
        </Feed>
        <Footer />
      </FeedWrapper>
    </Container>
  );
}
