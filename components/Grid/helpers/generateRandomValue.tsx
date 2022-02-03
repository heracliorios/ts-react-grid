const generateRandomValue = () => {
  const range = {
    max: 1,
    min: 0,
  };

  return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
};

export default generateRandomValue;
