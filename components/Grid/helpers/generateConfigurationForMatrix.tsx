import generateRandomValue from './generateRandomValue';
import matching from './matching';

const generateConfiguration = (size = 0) => {
  const counter = {
    row: 0,
    column: 0,
  };

  const data = [];
  const rows = [];

  const temp = {
    row: [],
  };

  if (size <= 0) return data;

  const max = size * size;

  matching.rows.flush();
  matching.columns.flush();

  for (let index = 0; index < max; index++) {
    const value = generateRandomValue();

    const configuration = {
      id: index,
      column: counter.column,
      row: counter.row,
      // diagonal: index - counter.row * (size + 1),
      value,
    };

    // NOTE: SCAFFOLD MATCHING ROWS
    matching.rows.scaffold(
      configuration,
      configuration.row,
      configuration.value,
      data[index - 1] && data[index - 1].value,
      size
    );

    // NOTE: SCAFFOLD COLUMNS
    matching.columns.scaffold(
      configuration,
      configuration.column,
      configuration.value,
      data[index - size] && data[index - size].value,
      size
    );

    // NOTE: SCAFFOLD DIAGONALS
    // TODO: COMPLETE
    // matching.diagonals.scaffold();

    // NOTE: PUSH NEW CONFIGURED POINTS
    temp.row.push(configuration);
    data.push(configuration);

    // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
    matching.columns.lock(configuration.column, size);

    if ((index + 1) % size === 0) {
      // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
      matching.rows.lock(configuration.row, size);

      rows.push(temp.row);
      temp.row = [];

      counter.row++;
      counter.column = 0;
    } else counter.column++;
  }

  return {
    data,
    rows,
    matches: matching.getMatches(size),
  };
};

export default generateConfiguration;
