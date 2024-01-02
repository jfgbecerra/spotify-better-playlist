function getPlaylistId(idAndSnapshot: string): string {
  const parts = idAndSnapshot.split('_');
  return parts[0];
}

function getPlaylistSnapshot(idAndSnapshot: string): string {
  const parts = idAndSnapshot.split('_');
  return parts[-1];
}
