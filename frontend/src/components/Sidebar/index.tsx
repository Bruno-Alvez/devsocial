import * as S from './styles';
import { getAvatarUrl } from '../../utils/avatarUtils';

import {
  FiHome,
  FiUser,
  FiFileText,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <S.SidebarContainer>
      <S.Header>{'</> devSocial'}</S.Header>
      <S.Divider />
      <S.SidebarUser>
        <S.SidebarAvatar src={getAvatarUrl(user?.avatar)} alt="User" />
        <span>@ {user?.username}</span>
      </S.SidebarUser>

      <S.NavItem as={Link} to="/"><FiHome /> Início</S.NavItem>
      <S.NavItem as={Link} to="/profile"><FiUser /> Perfil</S.NavItem>
      <S.NavItem as={Link} to="/my-posts"><FiFileText /> Publicações</S.NavItem>
      <S.NavItem as={Link} to="/notifications"><FiBell /> Notificações</S.NavItem>
      <S.NavItem as={Link} to="/login"><FiLogOut /> Sair</S.NavItem>
    </S.SidebarContainer>
  );
}
