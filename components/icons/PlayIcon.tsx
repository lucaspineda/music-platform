import React, { FC } from "react";

interface PlayIconProps {}
const PlayIcon: FC<PlayIconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M26 14.8453C26.8889 15.3585 26.8889 16.6415 26 17.1547L10 26.3923C9.11111 26.9055 8 26.264 8 25.2376L8 6.76239C8 5.73599 9.11111 5.09448 10 5.60768L26 14.8453Z"
        fill="black"
      />
    </svg>
  );
};

export default PlayIcon;
