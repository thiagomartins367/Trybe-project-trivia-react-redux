import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class PlayerRanking extends Component {
  render() {
    const {
      playerName,
      playerEmail,
      playerScore,
      dataTestIdPlayerName,
      dataTestIdPlayerScore,
    } = this.props;
    const hashEmail = md5(playerEmail).toString();
    return (
      <div>
        <div>
          <img
            data-testid=""
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt={ playerName }
          />
        </div>
        <span data-testid={ dataTestIdPlayerName }>{ playerName }</span>
        <span data-testid={ dataTestIdPlayerScore }>{ ` - ${playerScore} pontos` }</span>
        <hr />
      </div>
    );
  }
}

PlayerRanking.propTypes = {
  playerName: PropTypes.string,
  playerEmail: PropTypes.string,
  playerScore: PropTypes.number,
  dataTestIdPlayerName: PropTypes.string,
  dataTestIdPlayerScore: PropTypes.string,
};

PlayerRanking.defaultProps = {
  playerName: '',
  playerEmail: '',
  playerScore: 0,
  dataTestIdPlayerName: '',
  dataTestIdPlayerScore: '',
};

export default PlayerRanking;
