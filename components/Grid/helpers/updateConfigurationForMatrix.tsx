import matching from './matching';

const updateConfigurationForMatrix = (
  { row, column, value },
  matrix = { data: [] },
  size
) => {
  const rows = [];

  const temp = {
    row: [],
  };

  matching.rows.flush();
  matching.columns.flush();

  const data = matrix.data.map(
    (configuration = { row: [], column: [] }, index) => {
      const update = {
        ...configuration,
      };

      if (configuration.row === row && configuration.column === column) {
        update.value = value;
      }

      // NOTE: SCAFFOLD MATCHING ROWS
      matching.rows.scaffold(
        update,
        update.row,
        update.value,
        matrix.data[index - 1] && matrix.data[index - 1].value,
        size
      );

      // NOTE: SCAFFOLD COLUMNS
      matching.columns.scaffold(
        update,
        update.column,
        update.value,
        matrix.data[index - size] && matrix.data[index - size].value,
        size
      );

      temp.row.push(update);

      // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
      matching.columns.lock(update.column, size);

      if ((index + 1) % size === 0) {
        // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
        matching.rows.lock(update.row, size);

        rows.push(temp.row);
        temp.row = [];
      }

      return update;
    }
  );

  return {
    data,
    rows,
    matches: matching.getMatches(size),
  };
};

export default updateConfigurationForMatrix;
