import React, { FC } from "react";
import styles from "../styles/SongCard.module.css";
import { Song } from "../types";
import HeartIcon from "./icons/HeartIcon";
import Image from "next/image";

interface SongCardProps {
  songData: Song;
  favoriteSongIds: Set<number>;
  toggleFavoriteSong: (songId: number) => void
}

const SongCard: FC<SongCardProps> = ({ songData, favoriteSongIds, toggleFavoriteSong }) => {
  const songId = songData.id;
  const toggleFavoriteSongLocal = () => {
    toggleFavoriteSong(songData.id)
  }

  return (
    <figure className={styles.cardContainer}>
      <div className={styles.albumCover}>
        <Image
          className={styles.coverImg}
          src={`/assets/images/${songData.song.files.coverArt}`}
          layout="fill"
          objectFit="cover"
          alt="algum coverArt"
        />
      </div>
      <div className={styles.cardDetails}>
        <h3 className="mb-3 text-lg leading-4 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
          {songData.song.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className={styles.artistName}>{songData.song.artist}</span>
          <HeartIcon
            stroke={favoriteSongIds.has(songId) ? "#F8594E" : "white"}
            fill={favoriteSongIds.has(songId) ? "#F8594E" : ""}
            handleOnClick={toggleFavoriteSongLocal}
          />
        </div>
      </div>
    </figure>
  );
};

export default SongCard;
