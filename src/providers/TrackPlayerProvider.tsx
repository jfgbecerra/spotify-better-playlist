'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AuthSession } from '@/types';

interface TrackProviderState {
  isPaused: boolean;
  isActive: boolean;
  track: Spotify.Track | null;
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  previous: () => void;
  togglePlay: () => Promise<void>;
  changeVolume: (vol: number) => void;
}

const PlayerContext = createContext<TrackProviderState>({} as any);

interface Props {
  children: React.ReactNode;

  skip: boolean;
}

export default function TrackPlayerProvider({ children, skip = false }: Props) {
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [track, setTrack] = useState<Spotify.Track | null>(null);

  // Handle checking if the session is valid
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
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
          console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (state) => {
          if (!state) {
            return;
          }

          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then((state) => {
            if (!state) {
              setActive(false);
            } else {
              setActive(true);
            }
          });
        });

        player.connect().then((success) => {
          if (success) {
            console.log(
              'The Web Playback SDK successfully connected to Spotify!'
            );
          }
        });
      };
    }
  }, [session]);

  if (!session) {
    return null;
  }

  const togglePlay = async () => {
    if (!isPaused) pause();
    else await play();
  };

  const play = async () => {
    await player?.resume();
  };

  const pause = () => {
    player?.pause();
  };

  const next = async () => {
    await player?.nextTrack();
  };

  const previous = async () => {
    await player?.previousTrack();
  };

  const changeVolume = (vol: number) => {
    player?.setVolume(vol);
  };

  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  return (
    <PlayerContext.Provider
      value={{
        isPaused,
        isActive,
        track,
        play,
        pause,
        next,
        previous,
        togglePlay,
        changeVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
