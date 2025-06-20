export function getAvatarUrl(avatarPath?: string | null): string {
  const fallback = '/profile-user.png';

  if (!avatarPath || typeof avatarPath !== 'string' || avatarPath.trim() === '') {
    return fallback;
  }

  try {
    const url = new URL(avatarPath);
    return url.href;
  } catch {
    const baseApi = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    return `${baseApi}${avatarPath}`;
  }
}
