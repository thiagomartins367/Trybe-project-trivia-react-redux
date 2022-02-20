import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import {
  fetchApiOfQuestions,
  savePlayerAssertions,
  savePlayerPoints,
} from '../redux/actions';
import GenericButton from '../components/GenericButton';
import Feedback from './Feedback';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 1,
      gameOver: false,
      nextButtonDisabled: true,
      countdown: 30,
      timeOver: false,
    };
  }

  componentDidMount() {
    const { fetchApiOfQuestionsRedux, tokenAPi } = this.props;
    fetchApiOfQuestionsRedux(tokenAPi);
    localStorage.setItem('currentQuestion', 0);
    this.decreaseCounter();
  }

  componentDidUpdate() {
    this.stopCounter();
  }

  stopCounter = () => {
    const { timeOver, nextButtonDisabled } = this.state;
    if (timeOver === true || nextButtonDisabled === false) {
      clearInterval(this.decrease);
      // console.log('Interval Stopped');
    }
  }

  decreaseCounter = () => {
    const interval = 1000;
    this.decrease = setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 0) {
        this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
      } else {
        this.setState({
          timeOver: true,
          nextButtonDisabled: false,
        });
      }
    }, interval);
  }

  goToNextQuestion = () => {
    const { currentQuestion } = this.state;
    const { playerName, playerEmail, playerScore } = this.props;
    const MAXIMUM_QUESTIONS = 5;
    if (currentQuestion + 1 === MAXIMUM_QUESTIONS + 1) {
      let playersRanking = [];
      const playerObject = {
        playerName,
        playerEmail,
        playerScore,
      };
      playersRanking = localStorage.getItem('playersRanking');
      if (playersRanking !== null) {
        playersRanking = JSON.parse(playersRanking);
        playersRanking.push(playerObject);
        localStorage.setItem('playersRanking', JSON.stringify(playersRanking));
      } else {
        playersRanking = [];
        playersRanking.push(playerObject);
        localStorage.setItem('playersRanking', JSON.stringify(playersRanking));
      }
    }
    this.setState((prevState) => ({
      currentQuestion: currentQuestion < MAXIMUM_QUESTIONS
        ? prevState.currentQuestion + 1
        : currentQuestion,
      gameOver: currentQuestion + 1 === MAXIMUM_QUESTIONS + 1,
      nextButtonDisabled: true,
      countdown: 30,
      timeOver: false,
    }));
    this.decreaseCounter();
  }

  enableAndDisableNextQuestionButton = ({ target }) => {
    const { name } = target;
    const { nextButtonDisabled } = this.state;
    if (nextButtonDisabled === true) {
      this.setState({ nextButtonDisabled: false });
    }
    this.checkAnswer(name);
  }

  checkAnswer(name) {
    const { currentQuestion, countdown } = this.state;
    const {
      questionsRedux,
      savePlayerPointsRedux,
      savePlayerAssertionsRedux,
    } = this.props;
    const question = questionsRedux[currentQuestion - 1];
    // console.log('question: ', question);
    // console.log('questionsRedux: ', questionsRedux);
    // console.log('currentQuestion: ', currentQuestion);
    const { difficulty } = question;
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
    const TEEN = 10;

    if (name === 'correct-answer') {
      let dificultyPoints = 0;
      savePlayerAssertionsRedux(ONE);
      if (difficulty === 'hard') {
        dificultyPoints = THREE;
      } else if (difficulty === 'medium') {
        dificultyPoints = TWO;
      } else if (difficulty === 'easy') {
        dificultyPoints = ONE;
      }
      const points = TEEN + (countdown * dificultyPoints);
      savePlayerPointsRedux(points);
    }
  }

  render() {
    const {
      currentQuestion,
      gameOver,
      nextButtonDisabled,
      countdown,
      timeOver,
    } = this.state;
    const { questionsRedux } = this.props;
    return (
      <section>
        <BrowserRouter>
          <Route path="/feedback" component={ Feedback } />
        </BrowserRouter>
        {gameOver === true && <Redirect to="/feedback" />}
        <h1>Tela de Jogo</h1>
        <Header />
        <h3>{countdown}</h3>
        {questionsRedux.length > 0 && (
          <QuestionCard
            key={ questionsRedux[currentQuestion - 1].question }
            category={ questionsRedux[currentQuestion - 1].category }
            questionContent={ questionsRedux[currentQuestion - 1].question }
            correctAnswer={ questionsRedux[currentQuestion - 1].correct_answer }
            currentQuestion={ currentQuestion }
            nextQuestionButton={ this.enableAndDisableNextQuestionButton }
            incorrectAnswers={
              questionsRedux[currentQuestion - 1].incorrect_answers
            }
            dataTestidCategory="question-category"
            dataTestidQuestion="question-text"
            disableAlternatives={ timeOver }
          />
        )}
        <hr />
        <br />
        {nextButtonDisabled === false ? (
          <GenericButton
            buttonContent="Próxima"
            buttonDisabled={ nextButtonDisabled }
            buttonDataTestid="btn-next"
            onClickEvent={ this.goToNextQuestion }
          />
        ) : (
          false
        )}
      </section>
    );
  }
}

const mapStateToProps = (stateRedux) => ({
  tokenAPi: stateRedux.token,
  questionsRedux: stateRedux.questionsReducer.questions,
  playerName: stateRedux.player.name,
  playerEmail: stateRedux.player.gravatarEmail,
  playerScore: stateRedux.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiOfQuestionsRedux: (token) => dispatch(fetchApiOfQuestions(token)),
  savePlayerPointsRedux: (points) => dispatch(savePlayerPoints(points)),
  savePlayerAssertionsRedux: (assertions) => dispatch(savePlayerAssertions(assertions)),
});

Questions.propTypes = {
  fetchApiOfQuestionsRedux: PropTypes.func.isRequired,
  tokenAPi: PropTypes.string.isRequired,
  questionsRedux: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  savePlayerPointsRedux: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  savePlayerAssertionsRedux: PropTypes.func.isRequired,
};

Questions.defaultProps = {
  questionsRedux: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
