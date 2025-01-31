import React, { FC, MouseEvent } from "react";

interface HeartIconProps {
  fill: string;
  stroke: string;
  handleOnClick?: (e?: MouseEvent<HTMLDivElement>) => void;
}
const HeartIcon: FC<HeartIconProps> = ({fill, stroke, handleOnClick}) => {
  return (
    <div onClick={handleOnClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M9.56871 3.87749L10.0302 4.43561L10.5456 3.87749C12.3593 2.00054 15.1715 2.08784 17.0364 3.87749L17.1678 4.00844C18.9816 5.8854 18.5371 9.63697 16.8078 11.5669L16.5803 11.8156L16.327 12.083C15.3512 13.0971 13.8555 14.4856 11.8399 16.2484L10.6889 17.247C10.2918 17.5891 9.71377 17.5838 9.32258 17.2344L7.9018 15.9581L6.63683 14.8065C5.13321 13.4267 4.00458 12.3468 3.25094 11.5669C1.39402 9.64526 1.03665 5.93009 2.89357 4.00844C4.75048 2.0868 7.7118 1.95585 9.56871 3.87749Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
};

export default HeartIcon;
