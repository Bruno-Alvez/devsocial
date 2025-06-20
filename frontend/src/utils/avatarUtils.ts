export function getAvatarUrl(avatarPath?: string | null): string {
  const fallback = '/profile-user.png';
  if (!avatarPath) return fallback;
  return avatarPath;
}
