import React from 'react';
import propTypes from 'prop-types';

const PlusBtn = ({onClick}) => (
  <button onClick={onClick}>+</button>
);

PlusBtn.propTypes = {
  onClick: propTypes.func.isRequired
};

export default PlusBtn;
