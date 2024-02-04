import React from 'react';
import propTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <div className="button-wrapper">
      <button type="button" className="ButtonLoad" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
