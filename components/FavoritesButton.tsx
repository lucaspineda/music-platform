import React, { FC } from "react";
import styles from "../styles/FavoritesButton.module.css"
import HeartIcon from "./icons/HeartIcon";

interface FavoritesButtonProps {}
const FavoritesButton: FC<FavoritesButtonProps> = () => {
  return (
    <button className={styles.button}>
      <HeartIcon stroke="white" fill="" />
      Favorites
    </button>

  )
};

export default FavoritesButton;
