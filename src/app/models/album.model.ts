export interface Album {
  _id: string;
  title: string;
  description: string;
  songs: Song[];
}

export interface Song {
  title: string;
  length: string;
}
