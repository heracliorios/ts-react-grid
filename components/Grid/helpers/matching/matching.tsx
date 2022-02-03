import Match from './match';
import Diagonals from './diagonals';

const rows = new Match();
const columns = new Match();
const diagonals = new Diagonals();

const refresh = (data = [], size = 0) => {
  rows.flush();
  columns.flush();
  diagonals.flush();

  for (let index = 0; index < data.length; index++) {
    const configuration = data[index];

    // NOTE: SCAFFOLD MATCHING ROWS
    rows.scaffold(
      configuration,
      configuration.row,
      configuration.value,
      data[index - 1] && data[index - 1].value,
      size
    );

    // NOTE: SCAFFOLD COLUMNS
    columns.scaffold(
      configuration,
      configuration.column,
      configuration.value,
      data[index - size] && data[index - size].value,
      size
    );

    // NOTE: SCAFFOLD DIAGONALS
    diagonals.scaffold(
      size,
      configuration,
      configuration.id,
      configuration.column,
      configuration.row,
      configuration.diagonal,
      data
    );

    // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
    columns.lock(configuration.column, size);

    if ((index + 1) % size === 0) {
      // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
      rows.lock(configuration.row, size);
    }
  }
};

const getMatches = (size) => {
  const matches = {
    rows: {},
    columns: {},
    diagonals: {},
  };

  if (size <= 1) return matches;

  matches.rows = rows.getMatches();
  matches.columns = columns.getMatches();
  matches.diagonals = diagonals.getMatches();

  return matches;
};

export default {
  rows,
  columns,
  diagonals,
  getMatches,
  refresh,
};
