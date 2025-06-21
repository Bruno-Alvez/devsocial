export function getAvatarUrl(avatarPath?: string | null): string {
  const fallback = '/profile-user.png';

  if (!avatarPath || typeof avatarPath !== 'string' || avatarPath.trim() === '') {
    return fallback;
  }

  return avatarPath;
}
