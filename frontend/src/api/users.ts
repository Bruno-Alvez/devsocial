const API = import.meta.env.VITE_API_URL;

export async function fetchPublicProfile(username: string) {
  const res = await fetch(`${API}/users/${username}/public/`);
  if (!res.ok) throw new Error('Erro ao buscar perfil público');
  return res.json();
}

export async function fetchUserPosts(username: string) {
  const res = await fetch(`${API}/users/${username}/posts/`);
  if (!res.ok) throw new Error('Erro ao buscar posts públicos');
  return res.json();
}