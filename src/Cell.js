import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: 100px;
  height: 20px;
  text-align: center;
  border-top: 1px solid black;
  border-right: 1px solid black;
  padding: 5px 10px;
  cursor: default;
  user-select: none;
  box-sizing: border-box;
  background-color: ${({ highlight }) => highlight && "lightblue"};
`;

export const Cell = React.memo(({ data, columnIndex, rowIndex, style }) => {
  const {
    onHighlightStart,
    onHighlightDrag,
    onHighlightEnd,
    highlight,
    gridData,
  } = data;

  const renderContent = () => {
    // render headers
    if (rowIndex === 0) return columnIndex;
    if (columnIndex === 0) return rowIndex;

    return gridData?.[rowIndex]?.[columnIndex];
  };

  return (
    <StyledCell
      onMouseDown={() => onHighlightStart(rowIndex, columnIndex)}
      onMouseOver={(e) => onHighlightDrag(e, rowIndex, columnIndex)}
      onMouseUp={(e) => onHighlightEnd(rowIndex, columnIndex)}
      highlight={highlight(rowIndex, columnIndex)}
      style={style}
    >
      {renderContent()}
    </StyledCell>
  );
});
