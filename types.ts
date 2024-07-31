export interface Album {
  title: string;
  year: number;
}

export interface File {
  audio: string;
  coverArt: string;
  poster: string;
}

export interface SongDetails {
  album: Album;
  artist: string;
  files: File;
  title: string;
}

export interface Song {
  id: number;
  song: SongDetails;
  related?: number[]
}
