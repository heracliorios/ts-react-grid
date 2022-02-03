import Match from './match';
import Diagonals from './diagonals';

const rows = new Match();
const columns = new Match();
const diagonals = new Diagonals();

const getMatches = (size) => {
  const matches = {
    rows: {},
    columns: {},
  };

  if (size <= 1) return matches;

  matches.rows = rows.getMatches();
  matches.columns = columns.getMatches();

  return matches;
};

export default {
  rows,
  columns,
  diagonals,
  getMatches,
};
