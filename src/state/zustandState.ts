import {
  addTracks,
  deleteTracks,
  getTracks,
} from '@/lib/playlist-data-accessor';
import { AuthSession, StateTracks, Tracks } from '@/types';
import { create } from 'zustand';

// TODO: Need to optimize rerenders of the editor pane. When adding a playlist all the playlists are no longer called
// But it still refreshes all the rendered ui due to the global map getting a new object

type State = {
  /* Array of playlist IDs */
  playlistIds: string[];

  /* Map of playlist IDs to playlist objects */
  playlistMap: Map<string, StateTracks>;
};

type Action = {
  /* Add a new playlist ID to the store at a specific index */
  addPlaylistId: (
    playlistIdAndSnapshot: string,
    index: number,
    authSess: AuthSession
  ) => void;

  /* Remove a playlist ID from the store */
  removePlaylistId: (playlistIdAndSnapshot: string) => void;

  /* Move a playlist ID and snapshot from one index to another in the store */
  movePlaylistId: (prevIndex: number, newIndex: number) => void;

  /* Check if a specific ID snapshot exists in the array */
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

  addPlaylistId: async (playlistIdAndSnapshot, index, authSess) => {
    const playlistId = getPlaylistId(playlistIdAndSnapshot);
    const playlistSnapshot = getPlaylistSnapshot(playlistIdAndSnapshot);

    const playlistTracks = await getTracks(authSess, playlistId);
    set((state) => {
      const newPlaylistIds = [...state.playlistIds];
      newPlaylistIds.splice(index, 0, playlistId);
      const newPlaylistMap = new Map(state.playlistMap);
      newPlaylistMap.set(playlistId, {
        snapshotId: playlistSnapshot,
        tracks: playlistTracks,
      } as StateTracks);
      return { playlistIds: newPlaylistIds, playlistMap: newPlaylistMap };
    });
  },

  removePlaylistId: (playlistIdAndSnapshot) => {
    const playlistId = getPlaylistId(playlistIdAndSnapshot);

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

  idExists: (id: string) => {
    const playlistId = getPlaylistId(id);
    return get().playlistIds.includes(playlistId);
  },

  moveTrack: async (
    sourcePlaylistId: string,
    targetPlaylistId: string,
    prevIndex: number,
    newIndex: number,
    authSess: AuthSession
  ) => {
    const sourceId = getPlaylistId(sourcePlaylistId);
    const targetId = getPlaylistId(targetPlaylistId);

    const newPlaylistMap = new Map(get().playlistMap);
    const sourcePlaylist = newPlaylistMap.get(sourceId);
    const targetPlaylist = newPlaylistMap.get(targetId);
    const trackToMove = sourcePlaylist?.tracks.items[prevIndex];

    if (!trackToMove) {
      return;
    }

    // TODO: Need to parse out the response from here and update the playlist snapshot for the source and target
    const delSnapshot = await deleteTracks(authSess, sourcePlaylistId, [
      trackToMove.track.uri,
    ]);
    const addSnapshot = await addTracks(authSess, targetPlaylistId, newIndex, [
      trackToMove.track.uri,
    ]);

    set(() => {
      if (
        sourcePlaylist &&
        targetPlaylist &&
        sourcePlaylist?.tracks.items[prevIndex]
      ) {
        // Remove track from source playlist
        sourcePlaylist.tracks.items.splice(prevIndex, 1);
        newPlaylistMap.set(sourceId, sourcePlaylist);

        // Add track to target playlist at the new index
        targetPlaylist.tracks.items.splice(newIndex, 0, trackToMove);
        newPlaylistMap.set(targetId, targetPlaylist);
      }

      return { playlistMap: newPlaylistMap };
    });
  },
}));
