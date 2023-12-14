import { AuthSession, Playlists } from '@/types/types';
import { customGet } from '@/utils/serverUtils';

const BASEURL = 'https://api.spotify.com/';

export const getUserPlaylists = async (
  session: AuthSession,
  limit = 20,
  offset = 0
): Promise<Playlists> => {
  return customGet(
    `${BASEURL}v1/me/playlists?limit=${limit}&offset=${offset}`,
    session
  ).then((resp) => resp);
};

export const getPlaylist = async (
  session: AuthSession,
  playlist_id: string
): Promise<Playlists> => {
  return customGet(`${BASEURL}v1/playlists/${playlist_id}`, session).then(
    (resp) => resp
  );
};
