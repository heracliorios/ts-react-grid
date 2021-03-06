import React from 'react';

interface DataProps {}
interface DataState {}

const Data: React.FC<DataProps, DataState> = ({
  value,
  isInMatchingColumn,
  isInMatchingRow,
  isInMatchingDiagonal,
  row,
  column,
  diagonal,
  id,
  updateMatrix = () => {},
}) => {
  const onClick = () =>
    updateMatrix({
      id,
      column,
      row,
      diagonal,
      value: value > 0 ? 0 : 1,
    });

  const classes = [];

  classes.push('data');
  classes.push('no-select');

  if (isInMatchingColumn) classes.push('is-in-matching-column');
  if (isInMatchingRow) classes.push('is-in-matching-row');
  if (isInMatchingDiagonal) classes.push('is-in-matching-diagonal');

  const className = classes.join(' ');

  return (
    <div className={className} onClick={onClick}>
      {value}
    </div>
  );
};

export default Data;
