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
        previous: counter.row > 0 ? data[index - size].value : null,
        current: value,
      },
    };

    const configuration = {
      column: counter.column,
      row: counter.row,
      diagonal: index - counter.row * (size + 1),
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

    // NOTE: LOGIC FOR MATCHING DIAGONALS
    if (size > 0) {
      /*
      if (counter.column > 0 && counter.row > 0) {
        const root =
          Math.abs(configuration.diagonal) > 0
            ? data[index - (index - (size - configuration.diagonal) + 1)]
            : data[configuration.diagonal];

        if (root.value === configuration.value) {
          if (!(configuration.diagonal in temp.matches.diagonals)) {
            temp.matches.diagonals[configuration.diagonal] = [
              root,
              configuration,
            ];
          } else {
            temp.matches.diagonals[configuration.diagonal].push(configuration);
          }
        }
      }

      if (configuration.diagonal in temp.matches.diagonals) {
        // NOTE: PUSH DIAGONAL MATCHES, DONE PER DIAGONAL SIZE ACHIEVED.
        if (
          temp.matches.diagonals[configuration.diagonal].length ===
          size - Math.abs(configuration.diagonal)
        ) {
          matches.diagonals[configuration.diagonal] = [
            ...temp.matches.diagonals[configuration.diagonal],
          ];
        }
      }
      */
    }

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
