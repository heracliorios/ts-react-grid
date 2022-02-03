class Match {
  matches = {};
  temp = {};
  canMatch = {};

  scaffold = (configuration, key, current, previous, size) => {
    if (size > 0) {
      if (previous === undefined || !(key in this.temp)) {
        this.temp[key] = [
          {
            ...configuration,
          },
        ];
        this.canMatch[key] = true;
      } else {
        if (this.canMatch[key] && current === previous) {
          this.temp[key].push({
            ...configuration,
          });
        } else this.canMatch[key] = false;
      }
    }
  };

  lock = (key, size) => {
    if (this.canMatch[key] && this.temp[key].length === size) {
      this.matches = {
        ...this.matches,
        [key]: [...this.temp[key]],
      };
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

export default Match;
