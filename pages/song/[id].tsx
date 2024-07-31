import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/Song.module.css";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useFetchSong, useFetchSongs } from "../../hooks/fetchSongs";
import { Song, SongDetails } from "../../types";
import Image from "next/image";
import { FAVORITE_SONGS_LS_KEY } from "../../utils/constants";
import SongPlayer from "../../components/SongPlayer";
import SongCard from "../../components/SongCard";

interface SongProps {
  songId: string;
  songs: Song[];
}
const SongPageWrapper: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { songs }: { songs: Song[] } = useFetchSongs();

  return (
    <Layout songs={songs}>
      {id && <SongPage songId={id.toString()} songs={songs} />}
    </Layout>
  );
};

const SongPage: FC<SongProps> = ({ songId, songs }) => {
  const [favoriteSongIds, setFavoriteSongIds] = useState<Set<number>>(
    new Set()
  );

  const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);

  const { song: songData }: { song: Song } = useFetchSong(songId?.toString());

  const parsedIntSongId = parseInt(songId);

  const toggleFavoriteSong: () => void = () => {
    if (favoriteSongIds.has(parsedIntSongId)) {
      const newFavoriteSongs = new Set(favoriteSongIds);
      newFavoriteSongs.delete(parsedIntSongId);
      localStorage.setItem(
        FAVORITE_SONGS_LS_KEY,
        JSON.stringify(Array.from(newFavoriteSongs))
      );
      setFavoriteSongIds(newFavoriteSongs);
      return;
    }
    const newFavoriteSongs = new Set(favoriteSongIds);
    newFavoriteSongs.add(parsedIntSongId);
    localStorage.setItem(
      FAVORITE_SONGS_LS_KEY,
      JSON.stringify(Array.from(newFavoriteSongs))
    );
    setFavoriteSongIds(newFavoriteSongs);
  };

  useEffect(() => {
    const storedFavoritesSongsIds = localStorage.getItem(FAVORITE_SONGS_LS_KEY);
    if (storedFavoritesSongsIds) {
      setFavoriteSongIds(new Set(JSON.parse(storedFavoritesSongsIds)));
    }
  }, []);

  useEffect(() => {
    if (songData) {
      const relatedSongIdsSet = new Set(songData?.related);
      const filteredSongs = songs.filter((song) => {
        return relatedSongIdsSet.has(song.id);
      });
      setRelatedSongs(filteredSongs);
    }
  }, [songData, songs]);

  if (!songData) return null;

  return (
    <main className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src={`/assets/images/${songData?.song.files.poster}`}
          alt={""}
        ></Image>
      </div>
      <figure className="flex items-center relative z-10 md:flex-col md:gap-8">
        <Image
          width={204}
          height={204}
          sizes="100vw"
          src={`/assets/images/${songData?.song.files.coverArt}`}
          alt={""}
        ></Image>
        <SongPlayer
          song={songData.song}
          favoriteSongIds={favoriteSongIds}
          songId={parsedIntSongId}
          toggleFavoriteSong={toggleFavoriteSong}
        />
      </figure>
      <section className={styles.relatedSongs}>
        <h3>Other Albums</h3>
        <div className={styles.cardsContainer}>
          {relatedSongs.map((song) => (
            <SongCard key={song.id} songData={song} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default SongPageWrapper;
