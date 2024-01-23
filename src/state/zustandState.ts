import {
  addTracks,
  deleteTracks,
  getTracks,
} from '@/lib/playlist-data-accessor';
import { AuthSession, StateTracks, Track } from '@/types';
import { create } from 'zustand';
import { getPlaylistId, getPlaylistSnapshot } from './utils';

// TODO: Need to do some major cleanup / refactor here. This is a mess.
// Current logic allows decent speed for moving tracks back and forth but will need to look at moving multiple tracks at once.
type State = {
  /* Array of playlist IDs */
  playlistIds: string[];

  /* Array of snapshot IDs */
  snapshotMap: Map<string, string>;

  /* Map of playlist IDs to playlist objects */
  playlistMap: Map<string, StateTracks>;

  /* Current track being played */
  currentTrack: Spotify.Track | null;

  /* Spotify is paused boolean */
  isPaused: boolean;

  /* Spotify player is active boolean */
  isActive: boolean;

  /* Spotify player object */
  player: Spotify.Player | null;

  /* Volume level */
  volume: number;
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

  /* Set the current track */
  setCurrentTrack: (track: Spotify.Track) => void;

  /* Set the track pause state */
  setPaused: (isPaused: boolean) => void;

  /* Set the player active state */
  setActive: (isActive: boolean) => void;

  /* Set the player object */
  setPlayer: (player: Spotify.Player) => void;

  /* Toggle player pause state */
  togglePlay: () => void;

  /* Spotify player next track */
  next: () => void;

  /* Spotify player previous track */
  previous: () => void;

  /* Spotify player change volume */
  changeVolume: (volume: number) => void;

  /* Cleanup player */
  cleanupPlayer: () => void;
};

/* Zustand store for playlist editor panel */
export const usePlaylistStore = create<State & Action>((set, get) => ({
  playlistIds: [],
  playlistMap: new Map(),
  snapshotMap: new Map(),
  currentTrack: null,
  isPaused: false,
  isActive: false,
  player: null,
  track: null,
  volume: 0.5,

  addPlaylistId: async (playlistIdAndSnapshot, index, authSess) => {
    const playlistId = getPlaylistId(playlistIdAndSnapshot);
    const playlistSnapshot = getPlaylistSnapshot(playlistIdAndSnapshot);

    const playlistTracks = await getTracks(authSess, playlistId);
    set((state) => {
      const newPlaylistIds = [...state.playlistIds];
      newPlaylistIds.splice(index, 0, playlistId);
      const newPlaylistMap = new Map(state.playlistMap);
      const newSnapshotMap = new Map(state.snapshotMap);
      newPlaylistMap.set(playlistId, {
        snapshotId: playlistSnapshot,
        tracks: playlistTracks,
      } as StateTracks);
      newSnapshotMap.set(playlistId, playlistSnapshot);
      return {
        playlistIds: newPlaylistIds,
        playlistMap: newPlaylistMap,
        snapshotMap: newSnapshotMap,
      };
    });
  },

  removePlaylistId: (playlistIdAndSnapshot) => {
    const playlistId = getPlaylistId(playlistIdAndSnapshot);

    set((state) => {
      const newPlaylistIds = state.playlistIds.filter(
        (id) => id !== playlistId
      );
      const newPlaylistMap = new Map(state.playlistMap);
      const newSnapshotMap = new Map(state.snapshotMap);
      newPlaylistMap.delete(playlistId);
      newSnapshotMap.delete(playlistId);
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
    const newSnapshotMap = new Map(get().snapshotMap);
    const sourcePlaylist = newPlaylistMap.get(sourceId);
    const targetPlaylist = newPlaylistMap.get(targetId);
    const sourcePlaylistSnap = newSnapshotMap.get(sourceId);
    const targetPlaylistSnap = newSnapshotMap.get(targetId);
    const trackToMove = sourcePlaylist?.tracks.items[prevIndex];

    if (!trackToMove) {
      return;
    }

    if (!sourcePlaylistSnap || !targetPlaylistSnap) {
      return;
    }

    set(() => {
      // If a valid change occurred, update the playlist map
      if (
        sourcePlaylist &&
        targetPlaylist &&
        sourcePlaylist?.tracks.items[prevIndex]
      ) {
        // Remove track from source playlist
        sourcePlaylist.tracks.items.splice(prevIndex, 1);
        newPlaylistMap.set(sourceId, {
          snapshotId: sourcePlaylistSnap,
          tracks: sourcePlaylist.tracks,
        } as StateTracks);

        // Add track to target playlist at the new index
        targetPlaylist.tracks.items.splice(newIndex, 0, trackToMove);
        newPlaylistMap.set(targetId, {
          snapshotId: targetPlaylistSnap,
          tracks: targetPlaylist.tracks,
        } as StateTracks);
      }
      return { playlistMap: newPlaylistMap };
    });

    // Make rest calls to update the playlist on the server
    const delSnapshot = await deleteTracks(
      authSess,
      sourcePlaylistId,
      [trackToMove.track.uri],
      sourcePlaylistSnap
    );
    const addSnapshot = await addTracks(authSess, targetPlaylistId, newIndex, [
      trackToMove.track.uri,
    ]);

    // If both requests succeeded, update the snapshot map
    if (delSnapshot?.snapshot_id && addSnapshot?.snapshot_id) {
      set(() => {
        newSnapshotMap.set(sourceId, delSnapshot.snapshot_id);
        newSnapshotMap.set(targetId, addSnapshot.snapshot_id);
        return { snapshotMap: newSnapshotMap };
      });
    } else {
      // If any of the requests failed, revert the change
      set(() => {
        const newRevertPlaylistMap = new Map(get().playlistMap);
        if (
          sourcePlaylist &&
          targetPlaylist &&
          sourcePlaylist?.tracks.items[prevIndex]
        ) {
          if (!delSnapshot?.snapshot_id) {
            targetPlaylist.tracks.items.splice(newIndex, 0, trackToMove);
            newRevertPlaylistMap.set(targetId, {
              snapshotId: targetPlaylist.snapshotId,
              tracks: targetPlaylist.tracks,
            } as StateTracks);
          } else if (!addSnapshot?.snapshot_id) {
            sourcePlaylist.tracks.items.splice(prevIndex, 1);
            newRevertPlaylistMap.set(sourceId, {
              snapshotId: sourcePlaylist.snapshotId,
              tracks: sourcePlaylist.tracks,
            } as StateTracks);
          }
        }
        return { playlistMap: newRevertPlaylistMap };
      });
    }
  },

  setCurrentTrack: (track: Spotify.Track) =>
    set(() => ({
      currentTrack: track,
    })),

  setPaused: (isPaused: boolean) =>
    set(() => ({
      isPaused: isPaused,
    })),

  setActive: (isActive: boolean) =>
    set(() => ({
      isActive: isActive,
    })),

  setPlayer: (player: Spotify.Player) =>
    set(() => ({
      player: player,
    })),

  togglePlay: () => {
    const play = async () => {
      await get()
        .player?.resume()
        .then(() => {
          set(() => ({
            isPaused: false,
          }));
        });
    };

    const pause = () => {
      get()
        .player?.pause()
        .then(() => {
          set(() => ({
            isPaused: true,
          }));
        });
    };

    const togglePlay = async () => {
      if (!get().isPaused) pause();
      else await play();
    };

    // toggle the play button
    togglePlay();
  },

  next: () => {
    const next = async () => {
      await get().player?.nextTrack();
    };

    next();
  },

  previous: () => {
    const previous = async () => {
      await get().player?.previousTrack();
    };

    previous();
  },

  changeVolume: (volume: number) => {
    const changeVolume = (vol: number) => {
      get().player?.setVolume(vol);
      set(() => ({ volume: vol }));
    };

    changeVolume(volume);
  },

  cleanupPlayer: () => {
    get().player?.disconnect();
    set(() => ({
      player: null,
    }));
  },
}));
