import React, { FC } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import { Song } from "../types";

interface HeaderProps {
  songs?: Song[]
}
const Header: FC<HeaderProps> = ({songs}) => {
  const pathname = usePathname();
  const isInternalSongPage: boolean = pathname?.includes("/song/");

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
