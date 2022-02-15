import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenericButton from '../components/GenericButton';
import LabelAndInput from '../components/LabelAndInput';
import { fetchApi } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      playerEmail: '',
      playerName: '',
      disabledButton: true,
      redirectToSettings: false,
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

  redirectToSettingsBtn = () => {
    this.setState({ redirectToSettings: true });
  }

  render() {
    const {
      playerEmail,
      playerName,
      disabledButton,
      redirectToSettings,
    } = this.state;
    const { fetchAPIRedux } = this.props;
    return (
      <section>
        {redirectToSettings && <Redirect to="/settings" />}
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
        <GenericButton
          buttonContent="Settings"
          buttonDisabled={ false }
          buttonDataTestid="btn-settings"
          onClick={ this.redirectToSettingsBtn }
        />
      </section>
    );
  }
}

Login.propTypes = {
  fetchAPIRedux: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchAPIRedux: () => dispatch(fetchApi()),
});

export default connect(null, mapDispatchToProps)(Login);
