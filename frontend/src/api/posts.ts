export async function fetchUserFeed(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/feed/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar feed');
  }

  return response.json();
}
