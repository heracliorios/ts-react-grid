import React from 'react';

import Data from './Data';

interface MatrixProps {}
interface MatrixState {}

const Matrix: React.FC<MatrixProps, MatrixState> = ({
  rows = [],
  matches = { columns: {}, rows: {}, diagonals: {} },
  updateMatrix = () => {},
}) => {
  return (
    <div className="matrix">
      {rows.map((row, index) => (
        <div className="row" key={`grid-row-${index}`}>
          {row.map(({ id, value, column, row, diagonal }) => (
            <Data
              key={`grid-row-${row}-column-${column}`}
              value={value}
              isInMatchingColumn={matches.columns && column in matches.columns}
              isInMatchingRow={matches.rows && row in matches.rows}
              isInMatchingDiagonal={
                matches.diagonals && diagonal in matches.diagonals
              }
              row={row}
              column={column}
              diagonal={diagonal}
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
