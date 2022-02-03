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

/*
if (size > 0) {
  // if (counter.column > 0 && counter.row > 0) {
  //   const root =
  //     Math.abs(configuration.diagonal) > 0
  //       ? data[index - (index - (size - configuration.diagonal) + 1)]
  //       : data[configuration.diagonal];

  //   if (root.value === configuration.value) {
  //     if (!(configuration.diagonal in temp.matches.diagonals)) {
  //       temp.matches.diagonals[configuration.diagonal] = [
  //         root,
  //         configuration,
  //       ];
  //     } else {
  //       temp.matches.diagonals[configuration.diagonal].push(configuration);
  //     }
  //   }
  // }

  // if (configuration.diagonal in temp.matches.diagonals) {
  //   // NOTE: PUSH DIAGONAL MATCHES, DONE PER DIAGONAL SIZE ACHIEVED.
  //   if (
  //     temp.matches.diagonals[configuration.diagonal].length ===
  //     size - Math.abs(configuration.diagonal)
  //   ) {
  //     matches.diagonals[configuration.diagonal] = [
  //       ...temp.matches.diagonals[configuration.diagonal],
  //     ];
  //   }
  }
}
*/
