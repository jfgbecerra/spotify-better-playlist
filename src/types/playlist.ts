export interface Playlist {
  description: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images?: [
    {
      url: string;
      height: number | null;
      width: number | null;
    },
  ];
  name: string;
  owner: {
    href: string;
    id: string;
    uri: string;
    display_name: string;
  };
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
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
