class Match {
  matches = {};
  temp = {};

  scaffold = (configuration, key, current, previous, size) => {
    if (size > 0) {
      if (!(key in this.temp)) {
        this.temp[key] = [configuration];
      } else {
        if (previous === current) {
          this.temp[key].push(configuration);
        }
      }
    }
  };

  match = (key, size) => {
    if (this.temp[key].length === size) this.matches[key] = [...this.temp[key]];
  };
}

export default Match;
