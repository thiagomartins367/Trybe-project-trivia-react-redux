import React, { Component } from 'react';

class GenericButton extends Component {
  render() {
    const { typeButton, buttonContent, buttonDisabled, buttonDataTestid } = this.props;
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

export default GenericButton;
