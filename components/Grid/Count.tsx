import React, { useState } from 'react';

import { calculateMatches } from './helpers';

const Count = ({ matches = { columns: [], rows: [], diagonals: [] } }) => {
  const matches = calculateMatches(matches);

  return <div className="count">{matches}</div>;
};

export default Count;
