import { FC, useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { API_BASE_PATH } from "../utils/constants";
import Layout from "../components/Layout";
import FavoritesButton from "../components/FavoritesButton";
import ToggleSwitch from "../components/ToggleSwitch";
import SearchInput from "../components/SearchInput";
import { Song } from "../types";
import SongCard from "../components/SongCard";


const Home: FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const fetchSongs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_PATH}/songs`);
      const data = await response.json();
      setSongs(data.songs)
    } catch (err) {
      console.log(`An error occurred when when fetching data: ${err} `);
    }
  }, []);
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.searchSection}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className={styles.pageTitle}>Your Library</h2>
                <FavoritesButton />
              </div>
              <span className={styles.titleSpan}>
                You have 10 songs in your library
              </span>
            </div>
            <div className="flex items-center">
              <ToggleSwitch />
              <div className="ml-6">
                <SearchInput />
              </div>
            </div>
          </section>
          <section className={styles.cardsContainer}>
            {songs.map((song) => {
              return (
                <SongCard songData={song} />
              )
            })}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
