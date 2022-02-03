import Match from './match';

const rows = new Match();
const columns = new Match();

const getMatches = () => {
  return {
    rows: rows.matches,
    columns: columns.matches,
  };
};

export default {
  rows,
  columns,
  getMatches,
};
