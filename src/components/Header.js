import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { playerName, playerEmail, scorePlayerRedux } = this.props;
    const hashEmail = md5(playerEmail).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt={ playerName }
        />
        <h3 data-testid="header-player-name">{ playerName }</h3>
        <span>Pontos:</span>
        <h4 data-testid="header-score" className="player-score">{ scorePlayerRedux }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  scorePlayerRedux: state.player.score,
});

// const mapDispatchToProps = (dispatch) => ({

// });

Header.propTypes = {
  playerName: PropTypes.string,
  playerEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
