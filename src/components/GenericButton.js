import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const {
      typeButton = 'text',
      buttonContent,
      buttonDisabled,
      buttonDataTestid,
    } = this.props;
    return (
      <button
        type={ typeButton }
        disabled={ buttonDisabled }
        data-testid={ buttonDataTestid }
      >
        { buttonContent }
      </button>
    );
  }
}

GenericButton.propTypes = {
  typeButton: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  buttonDataTestid: PropTypes.string,
}.isRequired;

export default GenericButton;
