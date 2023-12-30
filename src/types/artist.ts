import { Image } from './general';

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  genres?: string[];
}
