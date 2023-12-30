import {
  addTracks,
  deleteTracks,
  getTracks,
} from '@/lib/playlist-data-accessor';
import { AuthSession, Tracks } from '@/types';
import { create } from 'zustand';

// TODO: Need to optimize rerenders of the editor pane. When adding a playlist all the playlists are no longer called
// But it still refreshes all the rendered ui due to the global map getting a new object

type State = {
  /* Array of playlist IDs */
  playlistIds: string[];

  /* Map of playlist IDs to playlist objects */
  playlistMap: Map<string, Tracks>;
};

type Action = {
  /* Add a new playlist ID to the store at a specific index */
  addPlaylistId: (
    playlistId: string,
    index: number,
    authSess: AuthSession
  ) => void;

  /* Remove a playlist ID from the store */
  removePlaylistId: (playlistId: string) => void;

  /* Move a playlist ID from one index to another in the store */
  movePlaylistId: (prevIndex: number, newIndex: number) => void;

  /* Gets the tracks for a playlist */
  getPlaylistTracks: (playlistId: string) => Tracks | undefined;

  /* Check if a specific ID exists in the playlistIds array */
  idExists: (id: string) => boolean;

  /* Move track between maps */
  moveTrack: (
    sourcePlaylistId: string,
    targetPlaylistId: string,
    prevIndex: number,
    newIndex: number,
    authSess: AuthSession
  ) => void;
};

/* Zustand store for playlist editor panel */
export const usePlaylistStore = create<State & Action>((set, get) => ({
  playlistIds: [],
  playlistMap: new Map(),

  addPlaylistId: async (playlistId, index, authSess) => {
    const playlistTracks = await getTracks(authSess, playlistId);
    set((state) => {
      const newPlaylistIds = [...state.playlistIds];
      newPlaylistIds.splice(index, 0, playlistId);
      const newPlaylistMap = new Map(state.playlistMap);
      newPlaylistMap.set(playlistId, playlistTracks);
      return { playlistIds: newPlaylistIds, playlistMap: newPlaylistMap };
    });
  },

  removePlaylistId: (playlistId) => {
    set((state) => {
      const newPlaylistIds = state.playlistIds.filter(
        (id) => id !== playlistId
      );
      const newPlaylistMap = new Map(state.playlistMap);
      newPlaylistMap.delete(playlistId);
      return { playlistIds: newPlaylistIds, playlistMap: newPlaylistMap };
    });
  },

  movePlaylistId: (prevIndex: number, newIndex: number) => {
    set((state) => {
      const newPlaylistIds = [...state.playlistIds];
      const playlistId = newPlaylistIds[prevIndex];
      newPlaylistIds.splice(prevIndex, 1);
      newPlaylistIds.splice(newIndex, 0, playlistId);
      return { playlistIds: newPlaylistIds };
    });
  },

  getPlaylistTracks: (playlistId: string) => {
    return get().playlistMap.get(playlistId);
  },

  idExists: (id: string) => {
    return get().playlistIds.includes(id);
  },

  moveTrack: (
    sourcePlaylistId: string,
    targetPlaylistId: string,
    prevIndex: number,
    newIndex: number,
    authSess: AuthSession
  ) => {
    set((state) => {
      const newPlaylistMap = new Map(state.playlistMap);
      const sourcePlaylist = newPlaylistMap.get(sourcePlaylistId);
      const targetPlaylist = newPlaylistMap.get(targetPlaylistId);

      if (
        sourcePlaylist &&
        targetPlaylist &&
        sourcePlaylist?.items[prevIndex]
      ) {
        const trackToMove = sourcePlaylist?.items[prevIndex];

        // Remove track from source playlist
        sourcePlaylist?.items.splice(prevIndex, 1);
        newPlaylistMap.set(sourcePlaylistId, sourcePlaylist);
        // TODO: If every added this call will need to be changed for moving mulitple tracks
        deleteTracks(authSess, sourcePlaylistId, [trackToMove.track.uri]);

        // Add track to target playlist at the new index
        targetPlaylist?.items.splice(newIndex, 0, trackToMove);
        newPlaylistMap.set(targetPlaylistId, targetPlaylist);
        addTracks(authSess, targetPlaylistId, newIndex, [
          trackToMove.track.uri,
        ]);
      }

      return { playlistMap: newPlaylistMap };
    });
  },
}));
