import { useState, useEffect, useCallback } from 'react';
import { API_BASE_PATH } from '../utils/constants';

export const useFetchSongs = () => {
  const [songs, setSongs] = useState([]);

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
