export function getPlaylistId(idAndSnapshot: string): string {
  const parts = idAndSnapshot.split('_');
  return parts[0];
}

export function getPlaylistSnapshot(idAndSnapshot: string): string {
  const parts = idAndSnapshot.split('_');
  return parts[parts.length - 1];
}
