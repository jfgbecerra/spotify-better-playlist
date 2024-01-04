import { Artist } from './artist';
import { Image, Person } from './general';

export interface Track {
  album: {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Artist[];
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface TrackWrapper {
  added_at: string;
  added_by: Person;
  is_local: boolean;
  track: Track;
}

export interface Tracks {
  href: string;
  items: TrackWrapper[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface StateTracks {
  snapshotId: string;
  tracks: Tracks;
}
