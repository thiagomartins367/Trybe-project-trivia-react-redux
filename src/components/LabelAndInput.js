import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndInput extends Component {
  render() {
    const {
      labelContent,
      inputId,
      inputType,
      nameInput,
      inputValue,
      onChangeEvent,
      inputDataTestid,
    } = this.props;
    return (
      <section>
        <label htmlFor={ inputId }>{ labelContent }</label>
        <br />
        <input
          type={ inputType }
          id={ inputId }
          name={ nameInput }
          value={ inputValue }
          onChange={ onChangeEvent }
          data-testid={ inputDataTestid }
        />
      </section>
    );
  }
}

LabelAndInput.propTypes = {
  labelContent: PropTypes.string,
  inputId: PropTypes.string,
  inputType: PropTypes.string,
  nameInput: PropTypes.string,
  inputValue: PropTypes.string,
  onChangeEvent: PropTypes.func,
  inputDataTestid: PropTypes.string,
}.isRequired;

export default LabelAndInput;
