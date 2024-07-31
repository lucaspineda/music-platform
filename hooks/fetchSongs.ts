import { useState, useEffect, useCallback } from "react";
import { API_BASE_PATH } from "../utils/constants";
import { Song } from "../types";

export const useFetchSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_PATH}/songs`);
      const data = await response.json();
      setSongs(data.songs);
    } catch (err) {
      console.log(`An error occurred when when fetching data: ${err} `);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return { songs };
};

export const useFetchSong = (songId: string) => {
  const [song, setSong] = useState<Song>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchSong = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_PATH}/songs/${songId}`);
      const data = await response.json();
      setSong(data);
    } catch (err) {
      console.log(`An error occurred when when fetching data: ${err} `);
    } finally {
      setLoading(false);
    }
  }, [songId]);

  useEffect(() => {
    if (songId) {
      fetchSong();
    }
  }, [fetchSong, songId]);

  return { song, loading };
};
