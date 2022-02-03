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
          this.canMatch[key] = true;
        } else this.canMatch[key] = false;
      }
    }
  };

  getMatches = () => {
    const result = {};

    for (const key in this.temp) {
      if (this.canMatch[key]) result[key] = [...this.temp[key]];
    }

    return result;
  };

  flush = () => {
    this.temp = {};
    this.canMatch = {};
  };
}

export default Match;
