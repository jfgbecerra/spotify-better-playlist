import { Image, Person } from './general';
export interface Playlist {
  description: string | null;
  href: string;
  id: string;
  images?: Image[];
  name: string;
  owner: Person;
  snapshot_id: string;
  uri: string;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist[];
}

export interface PlaylistEditResponse extends Response {
  snapshot_id: string;
}
