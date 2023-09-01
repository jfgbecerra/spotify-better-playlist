import { AuthSession, Playlists } from '@/types/types';
import { customGet } from '@/utils/serverUtils';

export const getUserPlaylists = async (
  session: AuthSession,
  limit = 20,
  offset = 0
): Promise<Playlists> => {
  return customGet(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
    session
  ).then((resp) => resp);
};
