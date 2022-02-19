import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsRedux, scorePlayerRedux } = this.props;
    const COMPARE_SCORE = 3;
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">
          { assertionsRedux >= COMPARE_SCORE ? 'Well Done!' : 'Could be better...' }
        </p>
        <div>
          <span>Você acertou</span>
          <span data-testid="feedback-total-question">{ ` ${assertionsRedux} ` }</span>
          <span>questões!</span>
        </div>
        <div>
          <span>Um total de</span>
          <span data-testid="feedback-total-score">{ ` ${scorePlayerRedux} ` }</span>
          <span>pontos</span>
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Play Again
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (stateRedux) => ({
  assertionsRedux: stateRedux.player.assertions,
  scorePlayerRedux: stateRedux.player.score,
});

Feedback.propTypes = {
  assertionsRedux: PropTypes.number,
  scorePlayerRedux: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
