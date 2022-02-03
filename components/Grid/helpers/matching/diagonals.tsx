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
