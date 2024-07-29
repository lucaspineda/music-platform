import React, { FC } from "react";
import styles from "../styles/Header.module.css"
import Link from "next/link";

interface HeaderProps {}
const Layout: FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h2 className={styles.logoText}>MUSE.ai</h2>
      </Link>
    </header>

  )
};

export default Layout;
