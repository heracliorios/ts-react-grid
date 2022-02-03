class Diagonals {
  temp = {};
  matches = {};
  canMatch = {};

  scaffold = (size, configuration, id, column, row, diagonal, data = []) => {
    if (size > 0) {
      if (column > 0 && row > 0) {
        const current = configuration;
        const previous = data[id - size - 1];

        // NOTE: LET'S RECORD OUR DIAGONAL'S ROOT
        if (!(previous.diagonal in this.temp)) {
          this.temp[diagonal] = [
            {
              ...previous,
            },
          ];

          this.canMatch[diagonal] = true;
        }

        if (this.canMatch[diagonal] && current.value === previous.value) {
          this.temp[diagonal].push({
            ...configuration,
          });
        } else {
          this.canMatch[diagonal] = false;
        }
      }

      // NOTE: PUSH DIAGONAL MATCHES, DONE PER DIAGONAL SIZE ACHIEVED.
      if (
        this.temp[diagonal] &&
        this.temp[diagonal].length === size - Math.abs(diagonal)
      ) {
        this.matches[diagonal] = [...this.temp[diagonal]];
      }
    }
  };

  getMatches = () => ({
    ...this.matches,
  });

  flush = () => {
    this.temp = {};
    this.matches = {};
    this.canMatch = {};
  };
}

export default Diagonals;

// ? data[id - (id - (size - diagonal) + 1)]
// const root = edge > 1 ? data[diagonal] : data[id - Math.abs(diagonal)];

// if (this.canMatch[key] && current === previous) {
//   this.temp[key].push({
//     ...configuration,
//   });
// } else this.canMatch[key] = false;

// console.log(previous);
// const root = edge > 1 ? data[diagonal] : data[id - Math.abs(diagonal)];

// if (previous.value === configuration.value) {
//   if (!(diagonal in this.temp)) {
//     this.temp[diagonal] = [previous, configuration];
//   } else {
//     this.temp[diagonal].push(configuration);
//   }
// }

/*
class Diagonals {
  temp = {};
  matches = {};

  scaffold = (size, configuration, id, column, row, diagonal, data = []) => {
    if (size > 0) {
      if (column > 0 && row > 0) {
        const root =
          Math.abs(diagonal) > 0
            ? data[id - (id - (size - diagonal) + 1)]
            : data[diagonal];

        if (root.value === configuration.value) {
          if (!(diagonal in this.temp)) {
            this.temp[diagonal] = [root, configuration];
          } else {
            this.temp[diagonal].push(configuration);
          }
        }
      }

      // NOTE: PUSH DIAGONAL MATCHES, DONE PER DIAGONAL SIZE ACHIEVED.
      if (diagonal in this.temp) {
        if (this.temp[diagonal].length === size - Math.abs(diagonal)) {
          this.matches[diagonal] = [...this.temp[diagonal]];
        }
      }
    }
  };

  getMatches = () => ({
    ...this.matches,
  });

  flush = () => {
    this.temp = {};
    this.matches = {};
  };
}

export default Diagonals;
*/
