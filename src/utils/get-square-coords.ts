import React from "react";
import { ISquareCoords } from "../interfaces/square-coords";

export function getSquareCoords(event: React.MouseEvent): ISquareCoords {
  const dayIndex = Number(
    (event.target as HTMLElement).getAttribute("data-day")
  );
  const hourIndex = Number(
    (event.target as HTMLElement).getAttribute("data-hour")
  );
  return {
    dayIndex,
    hourIndex,
  };
}
