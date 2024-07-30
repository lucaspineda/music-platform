import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "../styles/SearchInput.module.css";
import SearchIcon from "./icons/SearchIcon";
import { Song } from "../types";

interface SearchInputProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  songs: Song[];
}
const SearchInput: FC<SearchInputProps> = ({ inputValue, onChange, songs }) => {
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);

  const suggestedSongs = useMemo(() => {
    if (inputValue.length === 0) return [];
    const copiedSongs = [...songs];
    console.log("chamou", inputValue);
    return copiedSongs.filter((songData) => {
      return songData.song.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
    });
  }, [inputValue]);

  return (
    <div className={styles.searchContainer}>
      {suggestedSongs.length > 0 && (
        <div className={styles.searchSuggestion}>
          {suggestedSongs.map((item, index) => (
            <>
              <span>{item.song.title}</span>
              {index !== suggestedSongs.length - 1 && <div className={styles.separatorLine} />}
            </>
          ))}
        </div>
      )}
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="Search in your library"
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchInput;
