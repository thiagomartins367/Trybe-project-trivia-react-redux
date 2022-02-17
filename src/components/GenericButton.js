import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const {
      buttonContent,
      buttonDisabled,
      classNameButton,
      buttonDataTestid,
      onClickEvent,
      nameBtn,
    } = this.props;
    return (
      <button
        type="button"
        disabled={ buttonDisabled }
        className={ classNameButton }
        data-testid={ buttonDataTestid }
        onClick={ onClickEvent }
      >
        { buttonContent }
      </button>
    );
  }
}

GenericButton.propTypes = {
  buttonContent: PropTypes.string.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  classNameButton: PropTypes.string,
  buttonDataTestid: PropTypes.string,
  onClickEvent: PropTypes.func,
};

GenericButton.defaultProps = {
  classNameButton: '',
  buttonDataTestid: '',
  onClickEvent: () => '',
};

export default GenericButton;
