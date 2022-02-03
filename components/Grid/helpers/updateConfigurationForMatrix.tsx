import matching from './matching';

const updateConfigurationForMatrix = (
  { id, row, column, value },
  matrix = { data: [], rows: [] },
  size
) => {
  // NOTE: UPDATE DATA ACCORDINGLY
  let data = [...matrix.data];
  data[id].value = value;

  // NOTE: UPDATE ROWS ACCORDINGLY
  const rows = [...matrix.rows];
  rows[row][column] = data[id];

  // NOTE: REFRESH MATCHINGS ACCORDINGLY
  matching.refresh(data, size);

  return {
    data: [...data],
    rows: matrix.rows,
    matches: matching.getMatches(size),
  };
};

export default updateConfigurationForMatrix;
