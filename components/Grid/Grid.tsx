import React, { useState } from 'react';

import { generateRandomValue } from './helpers';

import Matrix from './Matrix';
import Select from './Select';
import Count from './Count';

import {
  generateConfigurationForMatrix,
  updateConfigurationForMatrix,
} from './helpers';

const defaultSize = generateRandomValue({
  max: 3,
  min: 3,
  // max: 6,
  // min: 2,
});

const defaultConfigurationForMatrix =
  generateConfigurationForMatrix(defaultSize);

const Grid = () => {
  const [size, setSize] = useState(defaultSize);
  const [matrix, setMatrix] = useState(defaultConfigurationForMatrix);

  const onSizeChange = (size) => {
    setSize(size);
    setMatrix(generateConfigurationForMatrix(size));
  };

  const updateMatrix = ({ id, row, column, value }) => {
    setMatrix((previousMatrix) =>
      updateConfigurationForMatrix(
        { id, row, column, value },
        previousMatrix,
        size
      )
    );
  };

  const { rows = [], matches = { columns: {}, rows: {}, diagonals: {} } } =
    matrix;

  console.log(matches.diagonals);

  return (
    <div className="grid">
      <Select onSizeChange={onSizeChange} defaultSize={defaultSize} />
      <Count matches={matches} />
      <Matrix rows={rows} matches={matches} updateMatrix={updateMatrix} />
    </div>
  );
};

export default Grid;
