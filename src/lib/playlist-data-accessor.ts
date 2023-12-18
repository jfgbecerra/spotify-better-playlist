'use server';

import { AuthSession, Playlists, Tracks } from '@/types/types';
import { customGet } from '@/utils/serverUtils';

const BASEURL = 'https://api.spotify.com/';

/**
 * Fetches the playlists of the current user.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {number} [limit=20] - The maximum number of playlists to return. Default is 20.
 * @param {number} [offset=0] - The index of the first playlist to return. Default is 0.
 * @returns {Promise<Playlists>} - A Promise that resolves to an object containing the user's playlists.
 */
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

/**
 * Fetches a specific playlist by its ID.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} playlist_id - The ID of the playlist to fetch.
 * @returns {Promise<Playlists>} - A Promise that resolves to an object containing the requested playlist.
 */
export const getPlaylist = async (
  session: AuthSession,
  playlist_id: string
): Promise<Playlists> => {
  return customGet(`${BASEURL}v1/playlists/${playlist_id}`, session).then(
    (resp) => resp
  );
};

/**
 * Fetches the tracks of a specific playlist by its ID.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} playlist_id - The ID of the playlist to fetch tracks from.
 * @returns {Promise<Tracks>} - A Promise that resolves to an object containing the tracks of the requested playlist.
 */
export const getTracks = async (
  session: AuthSession,
  playlist_id: string
): Promise<Tracks> => {
  return customGet(
    `${BASEURL}v1/playlists/${playlist_id}/tracks`,
    session
  ).then((resp) => resp);
};
