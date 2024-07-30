import React, { FC } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import { useFetchSongs } from "../hooks/useFetchSongs";

interface HeaderProps {}
const Header: FC<HeaderProps> = () => {
  const pathname = usePathname();
  const isInternalSongPage: boolean = pathname.includes("/song/");
  const { songs } = isInternalSongPage ? useFetchSongs() : { songs: [] };

  console.log(songs);

  return (
    <header className={styles.header}>
      <Link href="/">
        <h2 className={styles.logoText}>MUSE.ai</h2>
      </Link>
      {isInternalSongPage && (
        <div className={styles.suggestionsContainer}>
          <SearchInput songs={songs} />
        </div>
      )}
    </header>
  );
};

export default Header;
