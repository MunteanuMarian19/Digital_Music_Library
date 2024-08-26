import { Album } from './album.model';

export interface Artist {
  _id: string;
  name: string;
  albums: Album[];
}
