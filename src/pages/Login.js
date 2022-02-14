import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenericButton from '../components/GenericButton';
import LabelAndInput from '../components/LabelAndInput';
import { fetchApi } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      token: '',
      playerEmail: '',
      playerName: '',
      disabledButton: true,
    };
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
    const { playerEmail, playerName, disabledButton, token } = this.state;
    const { fetchAPIRedux } = this.props;
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
          buttonContent="Play"
          buttonDisabled={ disabledButton }
          buttonDataTestid="btn-play"
          onClickEvent={ () => fetchAPIRedux() }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPIRedux: () => dispatch(fetchApi()),
});

export default connect(null, mapDispatchToProps)(Login);
