const calculateMatches = (
  matches = { columns: [], rows: [], diagonals: [] }
) => {
  const { columns = [], rows = [], diagonals = [] } = matches;

  return (
    Object.keys(columns).length +
    Object.keys(rows).length +
    Object.keys(diagonals).length
  );
};

export default calculateMatches;
