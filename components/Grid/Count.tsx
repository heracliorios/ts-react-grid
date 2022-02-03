import React from 'react';

import { calculateMatches } from './helpers';

const Count = ({ matches = { columns: [], rows: [], diagonals: [] } }) => {
  const count = calculateMatches(matches);

  return <div className="count">{count}</div>;
};

export default Count;
