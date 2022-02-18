import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { fetchApiOfQuestions, savePlayerPoints } from '../redux/actions';
import GenericButton from '../components/GenericButton';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 1,
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
    const { countdown, nextButtonDisabled } = this.state;
    if (countdown === 0 || nextButtonDisabled === false) {
      clearInterval(this.decrease);
      console.log('Interval Stopped');
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
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
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
    this.handleChange(name);
  }

  handleChange(name) {
    const { currentQuestion } = this.state;
    const {
      questionsRedux,
      savePlayerPointsRedux,
      playerName,
      playerEmail,
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
      if (difficulty === 'hard') {
        dificultyPoints = THREE;
      } else if (difficulty === 'medium') {
        dificultyPoints = TWO;
      } else if (difficulty === 'easy') {
        dificultyPoints = ONE;
      }
      const points = TEEN + (1 * dificultyPoints);
      savePlayerPointsRedux(points);
      localStorage.setItem('updatedPlayerScore', 'false');
      localStorage.setItem(`${playerName} ${playerEmail}`, points);
      // console.log('chamou: IF');
    }
  }

  render() {
    const { currentQuestion, nextButtonDisabled, countdown, timeOver } = this.state;
    const { questionsRedux } = this.props;
    return (
      <section>
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiOfQuestionsRedux: (token) => dispatch(fetchApiOfQuestions(token)),
  savePlayerPointsRedux: (points) => dispatch(savePlayerPoints(points)),
});

Questions.propTypes = {
  fetchApiOfQuestionsRedux: PropTypes.func.isRequired,
  tokenAPi: PropTypes.string,
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
};

Questions.defaultProps = {
  tokenAPi: '',
  questionsRedux: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
