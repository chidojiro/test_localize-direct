import React from "react";

import { Grid } from "./Grid";

const dummyGridData = new Array(10)
  .fill(null)
  .map((_, rowIdx) =>
    new Array(10).fill(null).map((_, colIdx) => `${rowIdx} - ${colIdx}`)
  );

const App = () => {
  return <Grid col={1000} row={1000000} data={dummyGridData} />;
};

export default App;
