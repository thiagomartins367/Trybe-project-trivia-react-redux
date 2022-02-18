import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    const COMPARE_SCORE = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {score >= COMPARE_SCORE ? 'Well Done!' : 'Could be better...'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (stateRedux) => ({
  score: stateRedux.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
