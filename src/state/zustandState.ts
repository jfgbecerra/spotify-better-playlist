import { getTracks } from '@/lib/playlist-data-accessor';
import { AuthSession, Tracks } from '@/types/types';
import { create } from 'zustand';

// TODO: Need to optimize rerenders of the editor pane. When adding a playlist all the playlists are no longer called
// But it still refreshes all the rendered ui due to the global map getting a new object

type State = {
  /* Array of playlist IDs */
  playlistIds: string[];

  /* Map of playlist IDs to playlist objects */
  playlistMap: Map<string, Tracks>;
}


type Action = {
  /* Add a new playlist ID to the store at a specific index */
  addPlaylistId: (
    playlistId: string,
    index: number,
    authSess: AuthSession
  ) => void;

  /* Remove a playlist ID from the store */
  removePlaylistId: (playlistId: string) => void;
};

/* Zustand store for playlist editor panel */
export const usePlaylistStore = create<State & Action>((set) => ({
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
}));
