export function getAvatarUrl(avatarPath?: string | null): string {
  const fallback = '/profile-user.png';
  if (!avatarPath) return fallback;

  if (avatarPath.startsWith('http') || avatarPath.startsWith('https')) {
    return avatarPath;
  }

  const baseApi = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  return `${baseApi}${avatarPath}`;
}
