import React, { FC, memo } from "react";
import { ISquareCoords } from "../../interfaces/square-coords";
import { SQUARE_SIZE } from "../../consts/consts";
import { SquareColor } from "../../consts/types";

interface IProps {
  color: SquareColor;
  coords: ISquareCoords;
}

export const Square: FC<IProps> = memo(({ color, coords }) => {
  return (
    <div
      style={{
        width: `${SQUARE_SIZE}px`,
        height: `${SQUARE_SIZE}px`,
        backgroundColor: color,
        border: "1px solid black",
      }}
      data-day={coords.dayIndex}
      data-hour={coords.hourIndex}
      onDragStart={(event) => event.preventDefault()}
    ></div>
  );
});
