import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenericButton from '../components/GenericButton';
import LabelAndInput from '../components/LabelAndInput';
import { fetchApi, playerAction } from '../redux/actions';
import Settings from './Settings';

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
    const { fetchAPIRedux, playerActionRedux } = this.props;
    return (
      <section>
        <BrowserRouter>
          <Route path="/settings" component={ Settings } />
        </BrowserRouter>
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
        <Link to="/questions">
          <GenericButton
            buttonContent="Play"
            buttonDisabled={ disabledButton }
            buttonDataTestid="btn-play"
            onClickEvent={ () => {
              // fetchAPIRedux();
              playerActionRedux(playerName);
            }}
          />
        </Link>
        <GenericButton
          buttonContent="Settings"
          buttonDisabled={ false }
          buttonDataTestid="btn-settings"
          onClickEvent={ this.redirectToSettingsBtn }
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
  playerActionRedux: (playerName) => dispatch(playerAction(playerName)),
});

export default connect(null, mapDispatchToProps)(Login);
