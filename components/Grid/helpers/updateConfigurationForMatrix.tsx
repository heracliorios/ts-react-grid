const updateConfigurationForMatrix = (
  { row, column, value },
  matrix = { data: [] },
  size
) => {
  const rows = [];

  const temp = {
    row: [],
  };

  const data = matrix.data.map(
    (configuration = { row: [], column: [] }, index) => {
      const update = {
        ...configuration,
      };

      if (configuration.row === row && configuration.column === column) {
        update.value = value > 0 ? 0 : 1;
      }

      temp.row.push(update);

      if ((index + 1) % size === 0) {
        rows.push(temp.row);
        temp.row = [];
      }

      return update;
    }
  );

  return {
    data,
    rows,
    matches: {},
  };
};

export default updateConfigurationForMatrix;
