'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { AuthSession } from '@/types';
import { usePlaylistStore } from '@/state/zustandState';
import { setPlayer as setDevicePlayer } from '@/lib/playlist-data-accessor';

interface Props {
  children: React.ReactNode;

  skip: boolean;
}

export default function TrackPlayerProvider({ children, skip = false }: Props) {
  const setPaused = usePlaylistStore((state) => state.setPaused);
  const setActive = usePlaylistStore((state) => state.setActive);
  const setPlayer = usePlaylistStore((state) => state.setPlayer);
  const setTrack = usePlaylistStore((state) => state.setCurrentTrack);
  const setDuration = usePlaylistStore((state) => state.setDuration);
  const setCurrPos = usePlaylistStore((state) => state.setCurrentPos);
  const setDeviceId = usePlaylistStore((state) => state.setDeviceId);
  const setShuffle = usePlaylistStore((state) => state.setShuffle);
  const setRepeatMode = usePlaylistStore((state) => state.setRepeatMode);

  // Handle checking if the session is valid
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Better Playlist Player',
        getOAuthToken: (cb) => {
          cb((session as AuthSession).user.accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        const setDeviceActive = async () => {
          await setDevicePlayer(session as AuthSession, device_id);
        };

        setDeviceActive();
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setDuration(state.duration);
        setCurrPos(state.position);
        setPaused(state.paused);
        setShuffle(state.shuffle);
        setRepeatMode(state.repeat_mode);

        player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
          }
        });
      });

      player?.connect().then((success) => {
        if (success) {
          console.log(
            'The Web Playback SDK successfully connected to Spotify!'
          );
        }
      });
    };
  }, [session]);

  if (!session) {
    return null;
  }

  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  return <>{children}</>;
}
