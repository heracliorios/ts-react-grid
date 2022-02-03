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

  for (let index = 0; index < max; index++) {
    const value = generateRandomValue();

    const values = {
      row: {
        previous: index > 0 ? data[index - 1].value : null,
        current: value,
      },
      column: {
        previous: data[index - size] && data[index - size].value,
        current: value,
      },
    };

    const configuration = {
      column: counter.column,
      row: counter.row,
      // diagonal: index - counter.row * (size + 1),
      value,
    };

    // NOTE: SCAFFOLD MATCHING ROWS
    matching.rows.scaffold(
      configuration,
      configuration.row,
      values.row.previous,
      values.row.current,
      size
    );

    // NOTE: SCAFFOLD COLUMNS
    matching.columns.scaffold(
      configuration,
      configuration.column,
      values.column.previous,
      values.column.current,
      size
    );

    // NOTE: SCAFFOLD DIAGONALS
    // TODO: COMPLETE
    matching.diagonals.scaffold();

    // NOTE: PUSH NEW CONFIGURED POINTS
    temp.row.push(configuration);
    data.push(configuration);

    // NOTE: PUSH COLUMN MATCHES, DONE PER LOOP.
    if (size > 1) matching.columns.match(configuration.column, size);

    if ((index + 1) % size === 0) {
      // NOTE: PUSH ROW MATCHES, DONE PER ROW SIZE INCREASE.
      if (size > 1) matching.rows.match(configuration.row, size);

      rows.push(temp.row);
      temp.row = [];

      counter.row++;
      counter.column = 0;
    } else counter.column++;
  }

  return {
    data,
    rows,
    matches: matching.getMatches(),
  };
};

export default generateConfiguration;
