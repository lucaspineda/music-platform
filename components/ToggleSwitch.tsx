import React, { FC, useEffect, useState } from "react";
import styles from "../styles/ToggleSwitch.module.css";

interface ToggleSwitchProps {
  handleToggle: (sort: boolean) => void
}
const ToggleSwitch: FC<ToggleSwitchProps> = ({handleToggle}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleToggleLocal = () => {
    setIsChecked(!isChecked);
  };
  
  useEffect(() => {
    handleToggle(isChecked)
  }, [isChecked]);
  return (
    <>
    <label htmlFor="toggle" className="text-sm mr-2 font-semibold">Sort from A-Z</label>
    <div className={styles.toggleSwitch}>
      <input
        id="toggle"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleLocal}
        className={styles.toggleSwitchCheckbox}
      />
      <label className={`${styles.toggleSwitchLabel} ${
        isChecked ? styles.toggleSwitchLabelChecked : ""
      }`} htmlFor="toggle">
        <span
          className={`${styles.toggleSwitchInner} ${
            isChecked ? styles.toggleSwitchInnerChecked : ""
          }`}
        />
      </label>
    </div>
    </>
  );
};

export default ToggleSwitch;
