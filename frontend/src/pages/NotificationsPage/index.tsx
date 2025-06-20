import * as S from './styles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { getAvatarUrl } from '../../utils/avatarUtils';
import { fetchNotifications } from '../../api/notifications';

interface Notification {
  id: number;
  notification_type: 'like' | 'follow' | 'comment';
  post?: number | null;
  is_read: boolean;
  timestamp: string;
  sender_username: string;
  sender_avatar: string | null;
}

export default function NotificationsPage() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
    if (!token) return;

    try {
      const data = await fetchNotifications(token);
      setNotifications(data);
    } catch (err) {
      console.error('Erro ao carregar notificações:', err);
    }
  };

  loadNotifications();
}, [token]);
    ;

  const formatTimestamp = (iso: string) =>
    new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

  const renderMessage = (notification: Notification) => {
    switch (notification.notification_type) {
      case 'like':
        return 'curtiu sua publicação';
      case 'comment':
        return 'comentou na sua publicação';
      case 'follow':
        return 'começou a te seguir';
      default:
        return '';
    }
  };

  return (
    <S.Container>
      <Sidebar />
      <S.FeedWrapper>
        <S.Feed>
          <h2>Notificações</h2>

          {notifications.length === 0 ? (
            <S.PostText>Você ainda não possui nenhuma notificação.</S.PostText>
          ) : (
            notifications.map((notification) => (
              <S.PostCard key={notification.id}>
                <S.Avatar
                  src={getAvatarUrl(notification.sender_avatar) || '/profile-user.png'}
                  alt="Avatar"
                />
                <S.Content>
                  <S.Username>
                    @{notification.sender_username}{' '}
                    <span style={{ fontWeight: 400, color: '#c9d1d9' }}>
                      {renderMessage(notification)}
                    </span>
                  </S.Username>
                  <S.Timestamp>{formatTimestamp(notification.timestamp)}</S.Timestamp>
                </S.Content>
              </S.PostCard>
            ))
          )}
        </S.Feed>
        <Footer />
      </S.FeedWrapper>
    </S.Container>
  );
}
