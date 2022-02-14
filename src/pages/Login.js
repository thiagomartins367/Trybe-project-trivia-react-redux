import React, { Component } from 'react';
import GenericButton from '../components/GenericButton';
import LabelAndInput from '../components/LabelAndInput';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      playerEmail: '',
      playerName: '',
      disabledButton: true,
    }
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateEmailAndNameFields();
    });
  }

  validateEmailAndNameFields = () => {
    const { playerEmail, playerName } = this.state;
    if (playerEmail.length !== 0 && playerName.length !== 0) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  render() {
    const { playerEmail, playerName, disabledButton } = this.state;
    return (
      <section>
        <LabelAndInput
          labelContent="Email do Gravatar"
          inputId="input-player-email"
          inputType="text"
          nameInput="playerEmail"
          inputValue={ playerEmail }
          onChangeEvent={ this.handleInput }
          inputDataTestid="input-gravatar-email"
        />
        <br />
        <LabelAndInput
          labelContent="Nome do Jogador"
          inputId="input-player-name"
          inputType="text"
          nameInput="playerName"
          inputValue={ playerName }
          onChangeEvent={ this.handleInput }
          inputDataTestid="input-player-name"
        />
        <br />
        <GenericButton
          typeButton="button"
          buttonContent="Play"
          buttonDisabled={ disabledButton }
          buttonDataTestid="btn-play"
        />
      </section>
    );
  }
}

export default Login;
