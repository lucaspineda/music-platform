import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { API_BASE_PATH } from "../utils/constants";
import Layout from "../components/Layout";
import FavoritesButton from "../components/FavoritesButton";
import ToggleSwitch from "../components/ToggleSwitch";
import SearchInput from "../components/SearchInput";
import { Song } from "../types";
import SongCard from "../components/SongCard";
import { useFetchSongs } from "../hooks/useFetchSongs";

const Home: FC = () => {
  const localStorageKey = "favoriteSongIds";

  const [favoriteSongIds, setFavoriteSongIds] = useState<Set<number>>(
    new Set([])
  );
  const [isfilteredByFavoritesActive, setIsFilteredByFavoritesActive] =
    useState<boolean>(false);
  const [isAlphabeticalSortActive, setIsAlphabeticalSortActive] =
    useState<boolean>(false);

  const [searchQueryString, setSearchQueryString] = useState<string>("");

  const { songs } = useFetchSongs();

  useEffect(() => {
    const storedArray = localStorage.getItem(localStorageKey);
    if (storedArray) {
      setFavoriteSongIds(new Set(JSON.parse(storedArray)));
    }
  }, []);

  const handleSearchInputChange: (searchQuery: string) => void = (
    searchQuery
  ) => {
    setSearchQueryString(searchQuery);
  };

  const toggleFavoriteSong: (songId: number) => void = (songId) => {
    if (favoriteSongIds.has(songId)) {
      const newFavoriteSongs = new Set(favoriteSongIds);
      newFavoriteSongs.delete(songId);
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(Array.from(newFavoriteSongs))
      );
      setFavoriteSongIds(newFavoriteSongs);
      return;
    }
    const newFavoriteSongs = new Set(favoriteSongIds);
    newFavoriteSongs.add(songId);
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(Array.from(newFavoriteSongs))
    );
    setFavoriteSongIds(newFavoriteSongs);
  };

  const toggleFilterByFavorite: (favoriteChecked: boolean) => void = (
    favoriteChecked
  ) => {
    setIsFilteredByFavoritesActive(favoriteChecked);
  };

  const handleToggleSorted: (sortedValue: boolean) => void = (sortedValue) => {
    setIsAlphabeticalSortActive(sortedValue);
  };

  const filteredData = useMemo(() => {
    const newSongs = [...songs];
    const result = newSongs
      .filter((song) =>
        isfilteredByFavoritesActive ? favoriteSongIds.has(song.id) : true
      )
      .filter((songData) =>
        songData.song.title
          .toLowerCase()
          .includes(searchQueryString.toLowerCase())
      )
      .sort((a, b) => {
        if (isAlphabeticalSortActive) {
          return a.song.title.localeCompare(b.song.title);
        }
        return 0;
      });
    return result;
  }, [
    songs,
    isfilteredByFavoritesActive,
    isAlphabeticalSortActive,
    searchQueryString,
  ]);

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.searchSection}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className={styles.pageTitle}>Your Library</h2>
                <FavoritesButton
                  toggleFilterByFavorite={toggleFilterByFavorite}
                  filteredByFavorites={isfilteredByFavoritesActive}
                />
              </div>
              <span className={styles.titleSpan}>
                You have 10 songs in your library
              </span>
            </div>
            <div className="flex items-center">
              <ToggleSwitch handleToggle={handleToggleSorted} />
              <div className="ml-6">
                <SearchInput onChange={handleSearchInputChange} songs={songs} />
              </div>
            </div>
          </section>
          <section className={styles.cardsContainer}>
            {filteredData.map((song, index) => {
              return (
                <SongCard
                  key={index}
                  songData={song}
                  favoriteSongIds={favoriteSongIds}
                  toggleFavoriteSong={toggleFavoriteSong}
                />
              );
            })}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
