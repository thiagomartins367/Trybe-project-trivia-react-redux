import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GenericButton from '../components/GenericButton';
import PlayerRanking from '../components/PlayerRanking';

class Ranking extends Component {
  render() {
    const playersInformations = JSON.parse(
      localStorage.getItem('playersRanking') !== null
        ? localStorage.getItem('playersRanking')
        : '[]',
    );
    playersInformations.sort((a, b) => b.playerScore - a.playerScore);
    // console.log('playersInformations: ', playersInformations);
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {playersInformations.map((playerObject, index) => (
          <PlayerRanking
            key={
              `${
                playerObject.playerName
              }-${playerObject.playerEmail}-${playerObject.playerScore}`
            }
            playerName={ playerObject.playerName }
            playerEmail={ playerObject.playerEmail }
            playerScore={ playerObject.playerScore }
            dataTestIdPlayerName={ `player-name-${index}` }
            dataTestIdPlayerScore={ `player-score-${index}` }
          />
        ))}
        <Link to="/">
          <GenericButton
            buttonContent="Home"
            buttonDisabled={ false }
            buttonDataTestid="btn-go-home"
          />
        </Link>
      </section>
    );
  }
}

export default Ranking;
