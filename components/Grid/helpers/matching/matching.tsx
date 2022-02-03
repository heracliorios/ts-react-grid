import Match from './match';
import Diagonals from './diagonals';

const rows = new Match();
const columns = new Match();
const diagonals = new Diagonals();

const getMatches = () => {
  return {
    rows: rows.matches,
    columns: columns.matches,
  };
};

export default {
  rows,
  columns,
  diagonals,
  getMatches,
};
