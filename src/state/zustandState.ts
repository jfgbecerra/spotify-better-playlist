import { create } from 'zustand';

// TODO: Need to define data structure layout for this to not call the tracks for every playlist
// Whenever a new onne is added, it calls the tracks for every playlist
// Probably need to add more functions in here to handle making the calls and appending them through here!

type PlaylistState = {
  /* Array of playlist IDs */
  playlistIds: string[];

  /* Add a new playlist ID to the store at a specific index */
  addPlaylistId: (playlistId: string, index: number) => void;

  /* Remove a playlist ID from the store */
  removePlaylistId: (playlistId: string) => void;
};

/* Zustand store for playlist editor panel */
export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlistIds: [],
  addPlaylistId: (playlistId, index) => {
    set((state) => {
      const newPlaylistIds = [...state.playlistIds];
      newPlaylistIds.splice(index, 0, playlistId);
      return { playlistIds: newPlaylistIds };
    });
  },
  removePlaylistId: (playlistId) => {
    set((state) => {
      const newPlaylistIds = state.playlistIds.filter(
        (id) => id !== playlistId
      );
      return { playlistIds: newPlaylistIds };
    });
  },
}));
