import { SquareColor } from "../consts/types";
import { ISquareCoords } from "../../interfaces/square-coords";
import React from "react";
import { getSquareCoords } from "./get-square-coords";

export function getUpdatedColorsMap(
  colorsMap: SquareColor[][],
  selectStartCoords: ISquareCoords,
  event: React.MouseEvent,
  fillColor: SquareColor
): SquareColor[][] {
  const updatedColorsMap = [...colorsMap];
  const { hourIndex: hourStartIndex, dayIndex: dayStartIndex } =
    selectStartCoords;
  const { hourIndex, dayIndex } = getSquareCoords(event);

  let indexStart = Math.min(hourStartIndex, hourIndex);
  let indexEnd = Math.max(hourStartIndex, hourIndex);

  for (let i = indexStart; i < indexEnd + 1; i++) {
    updatedColorsMap[dayIndex][i] = fillColor;
  }

  indexStart = Math.min(dayStartIndex, dayIndex);
  indexEnd = Math.max(dayStartIndex, dayIndex);

  for (let i = indexStart; i < indexEnd + 1; i++) {
    updatedColorsMap[i][hourIndex] = fillColor;
  }
  return updatedColorsMap;
}
