import React from 'react';

import Data from './Data';

interface MatrixProps {}
interface MatrixState {}

const Matrix: React.FC<MatrixProps, MatrixState> = ({
  rows = [],
  matches = { columns: [], rows: [], diagonals: [] },
  updateMatrix = () => {},
}) => {
  return (
    <div className="matrix">
      {rows.map((row) => (
        <div className="row">
          {row.map(({ id, value, column, row, diagonal }) => (
            <Data
              key={`grid-row-${row}-column-${column}`}
              value={value}
              isInMatchingColumn={column in matches.columns}
              isInMatchingRow={row in matches.rows}
              // isInMatchingDiagonal={diagonal in matches.diagonals}
              row={row}
              column={column}
              updateMatrix={updateMatrix}
              id={id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
