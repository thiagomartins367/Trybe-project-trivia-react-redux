import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { fetchApiOfQuestions, actionSavePoints } from '../redux/actions';
import GenericButton from '../components/GenericButton';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 1,
      nextButtonDisabled: true,
    };
  }

  componentDidMount() {
    const { fetchApiOfQuestionsRedux, tokenAPi } = this.props;
    fetchApiOfQuestionsRedux(tokenAPi);
    localStorage.setItem('currentQuestion', 0);
  }

  goToNextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      nextButtonDisabled: true,
    }));
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
    const { questionsRedux, dispatchSavePoints, playerName, playerEmail } = this.props;
    const question = questionsRedux[currentQuestion - 1];
    console.log(question);
    console.log(questionsRedux);
    console.log(currentQuestion);
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
      dispatchSavePoints(points);
      localStorage.setItem(`${playerName} ${playerEmail}`, points);
      // console.log('chamou: IF');
    }
  }

  render() {
    const { currentQuestion, nextButtonDisabled } = this.state;
    const { questionsRedux } = this.props;
    return (
      <section>
        <h1>Tela de Jogo</h1>
        <Header />
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
  questionsRedux: stateRedux.playerAndQuestionsReducer.questions,
  playerName: stateRedux.playerAndQuestionsReducer.player.name,
  playerEmail: stateRedux.playerAndQuestionsReducer.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiOfQuestionsRedux: (token) => dispatch(fetchApiOfQuestions(token)),
  dispatchSavePoints: (points) => dispatch(actionSavePoints(points)),
});

Questions.propTypes = {
  fetchApiOfQuestionsRedux: PropTypes.func.isRequired,
  tokenAPi: PropTypes.string,
  questionsRedux: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
};

Questions.defaultProps = {
  tokenAPi: '',
  questionsRedux: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
