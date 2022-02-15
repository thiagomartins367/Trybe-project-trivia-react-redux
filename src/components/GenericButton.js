import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const {
      buttonContent,
      buttonDisabled,
      buttonDataTestid,
      onClickEvent,
    } = this.props;
    return (
      <button
        type="button"
        disabled={ buttonDisabled }
        data-testid={ buttonDataTestid }
        onClick={ onClickEvent }
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
