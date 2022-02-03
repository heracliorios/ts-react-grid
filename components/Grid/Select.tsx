import React, { useState } from 'react';

const Select = ({ onSizeChange, defaultSize = 0 }) => {
  const [size, setSize] = useState(defaultSize);

  const decreaseSetSize = () => {
    const newSize = size - 1;

    if (newSize < 1) {
      return;
    }

    setSize(newSize);

    onSizeChange(newSize);
  };

  const increaseSetSize = () => {
    const newSize = size + 1;

    setSize(newSize);

    onSizeChange(newSize);
  };

  return (
    <div className="select container">
      <div className="button no-select" onClick={() => decreaseSetSize()}>
        {'<'}
      </div>

      <div>{size}</div>

      <div className="button no-select" onClick={() => increaseSetSize()}>
        {'>'}
      </div>
    </div>
  );
};

export default Select;
