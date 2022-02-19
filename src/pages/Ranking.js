import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GenericButton from '../components/GenericButton';

class Ranking extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
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
