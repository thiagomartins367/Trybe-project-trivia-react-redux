import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      hashState: '',
    };
  }

  generateImage() {
    const { playerEmail } = this.props;
    const HASH = md5(playerEmail).toString();
    this.setState({ hashState: HASH });
  }

  render() {
    const { playerName } = this.props;
    const { score, hashState } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashState}` }
          alt={ playerName }
        />
        <h3 data-testid="header-player-name">{ playerName }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  playerName: PropTypes.string,
  playerEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
