export const isCellInRange = (range, cell) => {
  const [startCell, endCell] = range;
  const [rowIndex, columnIndex] = cell;

  const [startCellRow, startCellCol] = startCell;
  const [endCellRow, endCellCol] = endCell;

  return (
    rowIndex >= Math.min(startCellRow, endCellRow) &&
    rowIndex <= Math.max(startCellRow, endCellRow) &&
    columnIndex >= Math.min(startCellCol, endCellCol) &&
    columnIndex <= Math.max(startCellCol, endCellCol)
  );
};

export const stringifyGrid = (data) => {
  return data.reduce((result, row) => {
    const rowData = row.reduce((result, cellData) => {
      return result ? `${result} \t ${cellData}` : cellData;
    }, "");

    return result ? `${result} \n ${rowData}` : rowData;
  }, "");
};
