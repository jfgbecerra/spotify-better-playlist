'use server';

import {
  AuthSession,
  PlaylistEditResponse,
  Playlists,
  Tracks,
  Playlist,
  User,
} from '@/types';
import { Device } from '@/types/device';
import {
  customDelete,
  customGet,
  customPost,
  customPut,
} from '@/utils/serverUtils';

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
    `${BASEURL}v1/playlists/${playlist_id}?fields=name,public,images,type,description,followers,owner(display_name,id),tracks(total),uri`,
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

/**
 * Starts playing a specific track.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string[]} track_uris - The Spotify URI of the track to play.
 * @returns {Promise<void>} - A Promise that resolves when the track starts playing.
 */
export const playTrack = async (
  session: AuthSession | null,
  track_uris: string[]
): Promise<void> => {
  const body = {
    uris: track_uris,
    position_ms: 0,
  };

  customPut(`${BASEURL}v1/me/player/play`, session, body);
};

/**
 * Starts playing a specific playlist.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string[]} context_uri - The Spotify URI of the track to play.
 * @returns {Promise<void>} - A Promise that resolves when the track starts playing.
 */
export const playPlaylist = async (
  session: AuthSession | null,
  context_uri: string
): Promise<void> => {
  const body = {
    context_uri: context_uri,
    position_ms: 0,
  };

  customPut(`${BASEURL}v1/me/player/play`, session, body);
};

/**
 * Changes main device for a playback.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} device_ids - The Spotify device to set the playback to.
 * @param {boolean} play - If the playback should start immediately.
 * @returns {Promise<void>} - A Promise that resolves when the track starts playing.
 */
export const setPlayer = async (
  session: AuthSession | null,
  device_ids: string,
  play?: boolean
): Promise<void> => {
  const body = {
    device_ids: [device_ids],
    position_ms: 0,
    play: play ?? false,
  };

  customPut(`${BASEURL}v1/me/player`, session, body);
};

/**
 * Gets the currect users devices.
 *
 * @returns {Promise<Devices>} - A Promise that resolves to the response of the add request.
 */
export const getUserDevices = async (
  session: AuthSession
): Promise<Device[]> => {
  return customGet(`${BASEURL}v1/me/player/devices`, session).then(
    (resp) => resp
  );
};

/**
 * Sets the repeat mode of the player.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {string} state - The repeat state to set.
 * @returns {Promise<void>} - A Promise that resolves when the repeat state is set.
 */
export const setRepeatMode = async (
  session: AuthSession | null,
  state: string
): Promise<void> => {
  customPut(`${BASEURL}v1/me/player/repeat?state=${state}`, session);
};

/**
 * Starts playing a specific track.
 *
 * @param {AuthSession} session - The session object containing the user's authentication information.
 * @param {boolean} shuffle - The shuffle state to set.
 * @returns {Promise<void>} - A Promise that resolves when the shuffle state is set.
 */
export const setShuffleMode = async (
  session: AuthSession | null,
  shuffle: boolean
): Promise<void> => {
  customPut(`${BASEURL}v1/me/player/shuffle?state=${shuffle}`, session);
};
