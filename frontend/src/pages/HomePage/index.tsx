import {
  Container,
  Sidebar,
  Header,
  Divider,
  FeedWrapper,
  Feed,
  PostCard,
  Avatar,
  Content,
  Username,
  Timestamp,
  PostText,
  NavItem,
  SidebarUser,
  SidebarAvatar,
  FeedHeader,
  PostBox,
  UserAvatar,
  PlaceholderText,
  PostButton,
} from './styles';

import {
  FiHome,
  FiUser,
  FiFileText,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';

import  Footer  from '../../components/Footer';

import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  return (
    <Container>
      <Sidebar>
        <Header>{'</> devSocial'}</Header>
        <Divider />
        <SidebarUser>
          <SidebarAvatar src={user?.profile_picture || '/default-avatar.png'} alt="User" />
          <span>@{user?.username}</span>
        </SidebarUser>
        
        <NavItem><FiHome /> Início</NavItem>
        <NavItem><FiUser /> Perfil</NavItem>
        <NavItem><FiFileText /> Meus Posts</NavItem>
        <NavItem><FiBell /> Notificações</NavItem>
        <NavItem><FiLogOut /> Sair</NavItem>
      </Sidebar>

      <FeedWrapper>
        <Feed>
          <FeedHeader>
          <PostBox>
            <UserAvatar src={user?.profile_picture || '/default-avatar.png'} alt="User" />
            <PlaceholderText placeholder="No que você está pensando?" />
            <PostButton>Postar</PostButton>
          </PostBox>
        </FeedHeader>
          <PostCard>
            <Avatar src="https://i.pravatar.cc/100?img=1" alt="avatar" />
            <Content>
              <Username>bruno_dev</Username>
              <Timestamp>Há 2 horas</Timestamp>
              <PostText>
                Acabei de terminar minha primeira API com Django + DRF! 💪🔥
              </PostText>
            </Content>
          </PostCard>

          <PostCard>
            <Avatar src="https://i.pravatar.cc/100?img=2" alt="avatar" />
            <Content>
              <Username>lucas.js</Username>
              <Timestamp>Ontem</Timestamp>
              <PostText>
                Refatorei todo o front-end usando styled-components e fiquei impressionado com o resultado! 🚀
              </PostText>
            </Content>
          </PostCard>

          <PostCard>
            <Avatar src="https://i.pravatar.cc/100?img=3" alt="avatar" />
            <Content>
              <Username>maria.go</Username>
              <Timestamp>Há 3 dias</Timestamp>
              <PostText>
                Iniciando meu aprendizado em Go para microservices — alguma dica de projeto prático?
              </PostText>
            </Content>
          </PostCard>
        </Feed>
        <Footer/>
      </FeedWrapper>
    </Container>
  );
}
