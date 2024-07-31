import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/SongPlayer.module.css";
import HeartIcon from "./icons/HeartIcon";
import PlayIcon from "./icons/PlayIcon";
import { SongDetails } from "../types";

interface SongPlayerProps {
  song: SongDetails;
  favoriteSongIds: Set<number>;
  songId: number;
  toggleFavoriteSong: () => void;
}

const SongPlayer: FC<SongPlayerProps> = ({song, favoriteSongIds, songId, toggleFavoriteSong}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState<number>(0);

  const [formattedCurrentSongTime, setFormattedCurrentSongTime] = useState<string>('0:00');
  const [formattedformattedDuration, setFormattedformattedDuration] = useState<string>('0:00');

  useEffect(() => {
    setIsPlaying(false)
  }, [song]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        setFormattedCurrentSongTime(`${currentMinutes}:${currentSeconds}`)

        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
        setFormattedformattedDuration(`${durationMinutes}:${durationSeconds}`)
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [audioRef]);
  
  const toggleFavoriteSongLocal = () => {
    toggleFavoriteSong();
  }

  const handlePlayPause = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.songPlayerSection}>
      <div className="flex flex-col gap-9">
        <div className="flex gap-9">
          <audio ref={audioRef} src={`/assets/audio/${song.files.audio}`} />
          <div onClick={handlePlayPause} className={styles.playIconWrapper}>
            {isPlaying ? (
              <span className="text-black">||</span>
            ) : (
              <PlayIcon />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <h1 className={styles.songTitle}>{song.title}</h1>
              <HeartIcon
                stroke={
                  favoriteSongIds.has(songId) ? "#F8594E" : "white"
                }
                fill={favoriteSongIds.has(songId) ? "#F8594E" : ""}
                handleOnClick={(e) => toggleFavoriteSongLocal()}
              />
            </div>
            <div className={styles.songDetails}>
              <span>{song.artist}</span>
              <span>|</span>
              <span>{song.album.title}</span>
              <span>|</span>
              <span>{song.artist}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className={styles.progressBar}>
            <div className={styles.progressBarFilled} style={{ width: `${progress}%` }}/>
          </div>
          <div className="flex justify-between mt-2">
            <span>{formattedCurrentSongTime}</span>
            <span>{formattedformattedDuration}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SongPlayer;
