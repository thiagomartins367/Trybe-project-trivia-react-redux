import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsRedux, scorePlayerRedux } = this.props;
    const COMPARE_SCORE = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertionsRedux >= COMPARE_SCORE ? 'Well Done!' : 'Could be better...'}
        </p>
        <p data-testid="feedback-total-score">{scorePlayerRedux}</p>
        <p data-testid="feedback-total-question">{assertionsRedux}</p>
      </div>
    );
  }
}

const mapStateToProps = (stateRedux) => ({
  assertionsRedux: stateRedux.player.assertions,
  scorePlayerRedux: stateRedux.player.score,
});

Feedback.propTypes = {
  assertionsRedux: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
