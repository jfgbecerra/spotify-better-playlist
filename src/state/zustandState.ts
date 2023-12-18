import { create } from 'zustand';
import { AuthSession, Tracks } from '@/types/types';
import { getTracks } from '@/lib/playlist-data-accessor';

type PlaylistState = {
  /* Array of tracks that are currently open in the playlist editor panel */
  playlistsTracks: Tracks[];

  /* Add a new track array to the store */
  addPlaylistsTracks: (
    playlistId: string,
    index: number,
    session: AuthSession
  ) => void;

  /* Remove a track array from the playlist array */
  removePlaylistsTracks: (tracksIndex: number) => void;
};

/* Zustand store for playlist editor panel */
export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlistsTracks: [],
  addPlaylistsTracks: async (playlistId, index, session) => {
    const tracks = await getTracks(session, playlistId);
    set((state) => {
      const newPlaylist = [...state.playlistsTracks];
      newPlaylist.splice(index, 0, tracks);
      return { playlistsTracks: newPlaylist };
    });
  },
  removePlaylistsTracks: (trackIndex) =>
    set((state) => {
      const newPlaylist = [...state.playlistsTracks];
      newPlaylist.splice(trackIndex, 1);
      return { playlistsTracks: newPlaylist };
    }),
}));
