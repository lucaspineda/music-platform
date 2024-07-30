import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/SearchInput.module.css";
import SearchIcon from "./icons/SearchIcon";
import { Song } from "../types";
import Link from "next/link";

interface SearchInputProps {
  onChange?: (searchQuery: string) => void;
  songs: Song[];
}

const SearchInput: FC<SearchInputProps> = ({ onChange, songs }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const suggestionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  useEffect(() => {
    if (onChange) {
      onChange(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const suggestedSongs = useMemo(() => {
    if (inputValue.length === 0) return [];
    const copiedSongs = [...songs];
    return copiedSongs.filter((songData) => {
      return songData.song.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
    });
  }, [inputValue]);

  const handleSuggestionClicked: () => void = () => {
    setShowSuggestions(false)
    setInputValue('')
  }

  return (
    <div className={styles.searchContainer} ref={suggestionsRef}>
      {showSuggestions && suggestedSongs.length > 0 && (
        <div className={styles.searchSuggestion}>
          {suggestedSongs.map((item, index) => (
            <div key={item.id} className={styles.itemWrapper}>
              <Link onClick={handleSuggestionClicked} href={`/song/${item.id}`}>{item.song.title}</Link>
              {index !== suggestedSongs.length - 1 && <div className={styles.separatorLine} />}
            </div>
          ))}
        </div>
      )}
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleOnChange}
        placeholder="Search in your library"
        className={styles.searchInput}
        onFocus={() => setShowSuggestions(true)}
      />
    </div>
  );
};

export default SearchInput;
