import React, { FC } from "react";
import styles from "../styles/SearchInput.module.css";
import SearchIcon from "./icons/SearchIcon";

interface SearchInputProps {
}
const SearchInput: FC<SearchInputProps> = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search in your library"
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchInput;
