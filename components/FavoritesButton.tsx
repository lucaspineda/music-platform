import React, { FC, useEffect, useState } from "react";
import styles from "../styles/FavoritesButton.module.css";
import HeartIcon from "./icons/HeartIcon";

interface FavoritesButtonProps {
  toggleFilterByFavorite: (favoriteChecked: boolean) => void;
  filteredByFavorites: boolean;
}
const FavoritesButton: FC<FavoritesButtonProps> = ({
  toggleFilterByFavorite,
  filteredByFavorites,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleFilterByFavoriteLocal = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    toggleFilterByFavorite(isChecked)
  }, [isChecked]);
  return (
    <button className={styles.button} onClick={toggleFilterByFavoriteLocal}>
      <HeartIcon
        stroke={filteredByFavorites ? "#F8594E" : "white"}
        fill={filteredByFavorites ? "#F8594E" : ""}
      />
      Favorites
    </button>
  );
};

export default FavoritesButton;
