import React, { Component } from 'react';

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

export default LabelAndInput;
