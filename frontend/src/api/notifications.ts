export async function fetchNotifications(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar notificações');
  }

  return response.json();
}
