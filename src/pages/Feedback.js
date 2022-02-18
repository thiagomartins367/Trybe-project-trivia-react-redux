import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsRedux } = this.props;
    const COMPARE_SCORE = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertionsRedux >= COMPARE_SCORE ? 'Well Done!' : 'Could be better...'}
        </p>
      </div>
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
