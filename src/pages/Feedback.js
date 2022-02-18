import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsRedux } = this.props;
    const COMPARE_SCORE = 3;
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">
          { assertionsRedux >= COMPARE_SCORE ? 'Well Done!' : 'Could be better...' }
        </p>
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
});

Feedback.propTypes = {
  assertionsRedux: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
