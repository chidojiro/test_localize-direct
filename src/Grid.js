import React, { useEffect } from "react";
import { FixedSizeGrid } from "react-window";
import styled from "styled-components";

import { Cell } from "./Cell";
import { isCellInRange, stringifyGrid } from "./utils";

const StyledGrid = styled(FixedSizeGrid)`
  border: 1px solid black;
`;

export const Grid = ({ row, col, data }) => {
  const [startCell, setStartCell] = React.useState();
  const [endCell, setEndCell] = React.useState();

  const isCellHighlighted = React.useCallback(
    (rowIndex, columnIndex) => {
      if (!startCell) return false;

      if (endCell)
        return isCellInRange([startCell, endCell], [rowIndex, columnIndex]);
    },
    [startCell, endCell]
  );

  const handleCopy = React.useCallback(async () => {
    if (!startCell || !endCell) return;

    const [startCellRow, startCellCol] = startCell;
    const [endCellRow, endCellCol] = endCell;

    const selectedRows = data.filter(
      (_, idx) =>
        idx >= Math.min(startCellRow, endCellRow) &&
        idx <= Math.max(startCellRow, endCellRow)
    );

    const selectedGrid = selectedRows.map((row) =>
      row.filter(
        (_, idx) =>
          idx >= Math.min(startCellCol, endCellCol) &&
          idx <= Math.max(startCellCol, endCellCol)
      )
    );

    const gridDataInString = stringifyGrid(selectedGrid);

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(gridDataInString);
    } else if (window.clipboardData) {
      await window.clipboardData.setData("Text", gridDataInString);
    }
  }, [startCell, endCell, data]);

  useEffect(() => {
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, [handleCopy]);

  const handleHighlightStart = React.useCallback((rowIndex, columnIndex) => {
    setEndCell();
    setStartCell([rowIndex, columnIndex]);
  }, []);

  const handleHighlightDrag = React.useCallback(
    (event, rowIndex, columnIndex) => {
      if (event.buttons === 1 && startCell) {
        setEndCell([rowIndex, columnIndex]);
      }
    },
    [startCell]
  );

  const handleHighlightEnd = React.useCallback((rowIndex, columnIndex) => {
    setEndCell([rowIndex, columnIndex]);
  }, []);

  const gridItemData = React.useMemo(
    () => ({
      gridData: data,
      onHighlightStart: handleHighlightStart,
      onHighlightDrag: handleHighlightDrag,
      onHighlightEnd: handleHighlightEnd,
      highlight: isCellHighlighted,
    }),
    [
      data,
      handleHighlightStart,
      handleHighlightDrag,
      handleHighlightEnd,
      isCellHighlighted,
    ]
  );

  return (
    <StyledGrid
      className="grid"
      columnCount={col}
      columnWidth={100}
      height={720}
      rowCount={row}
      rowHeight={35}
      width={690}
      itemData={gridItemData}
    >
      {Cell}
    </StyledGrid>
  );
};
