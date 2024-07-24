export interface Album {
  _id: string; // Unique identifier for the album
  title: string;
  description: string;
  songs: Song[]; // Assuming you have a Song interface or type
}

export interface Song {
  title: string;
  length: string;
}
