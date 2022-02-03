import matching from './matching';

const updateConfigurationForMatrix = (
  { id, row, column, value },
  matrix = { data: [], rows: [] },
  size
) => {
  // NOTE: UPDATE DATA ACCORDINGLY
  let data = [...matrix.data];
  data[id].value = value;

  // NOTE: REFRESH MATCHINGS ACCORDINGLY
  matching.rows.flush();
  matching.columns.flush();
  data = data.map((configuration = { row: [], column: [] }, index) => {
    // NOTE: SCAFFOLD MATCHING ROWS
    matching.rows.scaffold(
      configuration,
      configuration.row,
      configuration.value,
      matrix.data[index - 1] && matrix.data[index - 1].value,
      size
    );

    // NOTE: SCAFFOLD COLUMNS
    matching.columns.scaffold(
      configuration,
      configuration.column,
      configuration.value,
      matrix.data[index - size] && matrix.data[index - size].value,
      size
    );

    // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
    matching.columns.lock(configuration.column, size);

    if ((index + 1) % size === 0) {
      // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
      matching.rows.lock(configuration.row, size);
    }

    return configuration;
  });

  // NOTE: UPDATE ROWS ACCORDINGLY
  const rows = [...matrix.rows];
  rows[row][column] = data[id];

  return {
    data: [...data],
    rows: matrix.rows,
    matches: matching.getMatches(size),
  };
};

export default updateConfigurationForMatrix;
