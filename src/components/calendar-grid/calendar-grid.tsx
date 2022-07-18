import React, { FC, memo, useCallback, useMemo, useState } from "react";
import { Square } from "../square/square";
import {
  DAYS_NUMBER,
  HOURS_NUMBER,
  SQUARE_COLORS,
  SQUARE_SIZE,
} from "../consts/consts";
import { SquareColor } from "../consts/types";
import { ISquareCoords } from "../../interfaces/square-coords";
import { getSquareCoords } from "../utils/get-square-coords";
import { getUpdatedColorsMap } from "../utils/get-updated-colors-map";

export const CalendarGrid: FC = memo(() => {
  const daysArray = useMemo(() => [...Array(DAYS_NUMBER)], []);
  const hoursArray = useMemo(() => [...Array(HOURS_NUMBER)], []);
  const colorsMapInit: SquareColor[][] = useMemo(
    () => daysArray.map(() => hoursArray.map(() => "red")),
    []
  );

  const [colorsMap, setColorsMap] = useState(colorsMapInit);
  const [fillColor, setFillColor] = useState<SquareColor>("white");
  const [selectStartCoords, setSelectStartCoords] = useState<ISquareCoords>({
    hourIndex: 0,
    dayIndex: 0,
  });

  const ouMouseOver = useCallback(
    (event: React.MouseEvent) => {
      if (event.buttons === 1) {
        const updatedColorsMap = getUpdatedColorsMap(
          colorsMap,
          selectStartCoords,
          event,
          fillColor
        );
        setColorsMap(() => updatedColorsMap);
      }
    },
    [selectStartCoords]
  );

  const onMousseDown = (event: React.MouseEvent) => {
    const { hourIndex, dayIndex } = getSquareCoords(event);
    setSelectStartCoords({
      hourIndex,
      dayIndex,
    });

    const curColor = colorsMap[dayIndex][hourIndex];
    setFillColor(() => SQUARE_COLORS.find((color) => color !== curColor)!);
  };

  return (
    <div
      style={{
        width: `${SQUARE_SIZE * 24}px`,
        display: "grid",
        gridTemplateRows: `repeat(${DAYS_NUMBER}, ${SQUARE_SIZE}px)`,

        gridTemplateColumns: `repeat(${HOURS_NUMBER}, ${SQUARE_SIZE}px)`,
      }}
      onMouseOver={ouMouseOver}
      onMouseDown={onMousseDown}
    >
      {daysArray.map((day, dayIndex) =>
        hoursArray.map((hour, hourIndex) => {
          return (
            <Square
              coords={{ dayIndex, hourIndex }}
              key={`${dayIndex}${hourIndex}`}
              color={colorsMap[dayIndex][hourIndex]}
            />
          );
        })
      )}
    </div>
  );
});
