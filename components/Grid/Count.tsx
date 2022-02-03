import React from 'react';

import { gridCount } from './helpers';

const Count = ({ matches = { columns: [], rows: [], diagonals: [] } }) => {
  const count = gridCount(matches);

  return <div className="count">Grid Count: {count}</div>;
};

export default Count;
