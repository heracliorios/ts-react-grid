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
        update.value = value > 0 ? 0 : 1;
      }

      const values = {
        row: {
          previous: index > 0 ? matrix.data[index - 1].value : null,
          current: update.value,
        },
        column: {
          previous:
            matrix.data[index - size] && matrix.data[index - size].value,
          current: update.value,
        },
      };

      // NOTE: SCAFFOLD MATCHING ROWS
      matching.rows.scaffold(
        update,
        update.row,
        values.row.current,
        values.row.previous,
        size
      );

      // NOTE: SCAFFOLD COLUMNS
      matching.columns.scaffold(
        update,
        update.column,
        values.column.current,
        values.column.previous,
        size
      );

      temp.row.push(update);

      // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
      matching.columns.match(update.column, size);

      if ((index + 1) % size === 0) {
        // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
        matching.rows.match(update.row, size);

        rows.push(temp.row);
        temp.row = [];
      }

      return update;
    }
  );

  return {
    data,
    rows,
    matches: matching.getMatches(),
  };
};

export default updateConfigurationForMatrix;
