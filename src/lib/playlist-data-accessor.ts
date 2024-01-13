'use server';

import {
  AuthSession,
  PlaylistEditResponse,
  Playlists,
  Tracks,
  Playlist,
  User,
} from '@/types';
import { customDelete, customGet, customPost } from '@/utils/serverUtils';

const BASEURL = 'https://api.spotify.com/';

/**
 * Fetches the playlists of the current user.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {number} [limit=20] - The maximum number of playlists to return. Default is 20.
 * @param {number} [offset=0] - The index of the first playlist to return. Default is 0.
 * @returns {Promise<Playlists>} - A Promise that resolves to an object containing the user's playlists.
 */
export const getSidebarUserPlaylists = async (
  session: AuthSession,
  limit = 20,
  offset = 0
): Promise<Playlists> => {
  return customGet(
    `${BASEURL}v1/me/playlists?limit=${limit}&offset=${offset}&fields=items(name,id,images,owner(display_name,id),snapshot_id)`,
    session
  ).then((resp) => resp);
};

/**
 * Fetches a specific playlist by its ID.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} playlist_id - The ID of the playlist to fetch.
 * @returns {Promise<Playlist>} - A Promise that resolves to an object containing the requested playlist.
 */
export const getPlaylistInfo = async (
  session: AuthSession,
  playlist_id: string
): Promise<Playlist> => {
  return customGet(
    `${BASEURL}v1/playlists/${playlist_id}?fields=name,public,images,type,description,followers,owner(display_name,id),tracks(total)`,
    session
  ).then((resp) => resp);
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

/**
 * Deletes multiple tracks from a specific playlist by their URIs.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} playlist_id - The ID of the playlist to delete the tracks from.
 * @param {string[]} track_uris - The Spotify URIs of the tracks to delete.
 * @param {string} snapshot - The snapshot ID of the playlist.
 * @returns {Promise<PlaylistEditResponse>} - A Promise that resolves to the response of the delete request.
 */
export const deleteTracks = async (
  session: AuthSession,
  playlist_id: string,
  track_uris: string[],
  snapshot: string
): Promise<PlaylistEditResponse> => {
  const body = {
    tracks: track_uris.map((uri) => ({ uri })),
    snapshot_id: snapshot,
  };

  return customDelete(
    `${BASEURL}v1/playlists/${playlist_id}/tracks`,
    session,
    body
  ).then((resp) => resp);
};

/**
 * Adds multiple tracks to a specific playlist by their URIs.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} playlist_id - The ID of the playlist to add the tracks to.
 * @param {number} position - The position for the track to be placed.
 * @param {string[]} track_uris - The Spotify URIs of the tracks to add.
 * @returns {Promise<PlaylistEditResponse>} - A Promise that resolves to the response of the add request.
 */
export const addTracks = async (
  session: AuthSession,
  playlist_id: string,
  position: number,
  track_uris: string[]
): Promise<PlaylistEditResponse> => {
  const body = {
    uris: track_uris,
    position: position,
  };
  return customPost(
    `${BASEURL}v1/playlists/${playlist_id}/tracks`,
    session,
    body
  ).then((resp) => resp);
};

/**
 * Gets the current users profile.
 *
 * @returns {Promise<User>} - A Promise that resolves to the response of the add request.
 */
export const getCurrentUser = async (session: AuthSession): Promise<User> => {
  return customGet(`${BASEURL}v1/me`, session).then((resp) => resp);
};
