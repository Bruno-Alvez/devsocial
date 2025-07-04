import * as S from './styles';
import {
  FiEdit, FiCheck, FiTrash2, FiX
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import { getAvatarUrl } from '../../utils/avatarUtils';

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

    const formData = new FormData();

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
      formData.append(field, `${year}-${month}-${day}`);
    } else {
      formData.append(field, value);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();
      const updated = await res.json();
      updateUser({ ...user, avatar: updated.avatar });

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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: null }),
      });

      if (!res.ok) throw new Error();
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
      <S.InfoLabel>{label}</S.InfoLabel>
      {isOwnProfile && editingField === field ? (
        <>
          <S.InputField
            value={profile[field] || ''}
            onChange={e => setProfile({ ...profile, [field]: e.target.value })}
          />
          <S.EditButton onClick={() => handleSaveField(field, String(profile[field] ?? ''))}>
            <FiCheck /> Salvar
          </S.EditButton>
        </>
      ) : (
        <>
          <S.InfoValue>{profile[field] || '-'}</S.InfoValue>
          {isOwnProfile && (
            <S.EditButton onClick={() => setEditingField(field)}>
              <FiEdit /> Editar
            </S.EditButton>
          )}
        </>
      )}
    </div>
  );

  const avatarPreviewSrc = previewAvatar || getAvatarUrl(profile.avatar);

  return (
    <S.Container>
      <Sidebar />
      <S.FeedWrapper>
        <S.Feed>
          <S.FeedHeader>
            <S.ProfileColumn>
              <S.ProfileAvatar src={avatarPreviewSrc} alt="Avatar" />
              {isOwnProfile && (
                <>
                  <S.UploadInput
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarPreview}
                  />
                  <S.EditButton onClick={handleAvatarUpload}>
                    <FiCheck /> Atualizar foto de perfil
                  </S.EditButton>
                  <S.EditButton onClick={handleRemoveAvatar}>
                    <FiX /> Remover foto
                  </S.EditButton>
                </>
              )}
            </S.ProfileColumn>

            <S.DividerVertical />

            <S.ProfileInfo>
              <S.Username>@{profile.username}</S.Username>
              {renderField('Bio: (Conte-nos sobre você)', 'bio')}
              {renderField('E-mail: Ex: (seuemail@seuemail.com)', 'email')}
              {renderField('Localização: Ex: (Cidade-Estado-País)', 'location')}
              {renderField('Nascimento: Ex: (DD/MM/AAAA)', 'birth_date')}
            </S.ProfileInfo>
          </S.FeedHeader>

          {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}

          {isOwnProfile && (
            <S.BottomActions>
              <S.ActionButton primary onClick={handleSaveAll}>
                <FiCheck /> Salvar perfil
              </S.ActionButton>
              <S.ActionButton danger onClick={handleDeleteAccount}>
                <FiTrash2 /> Excluir conta
              </S.ActionButton>
            </S.BottomActions>
          )}
        </S.Feed>
        <Footer />
      </S.FeedWrapper>
    </S.Container>
  );
}
