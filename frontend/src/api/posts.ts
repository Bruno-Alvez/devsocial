export async function fetchUserFeed(token: string) {
  const response = await fetch('http://localhost:8000/api/v1/posts/feed/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar feed');
  }

  return response.json();
}
