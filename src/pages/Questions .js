import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { fetchApiOfQuestions } from '../redux/actions';
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

  
  stopCounter = () => {
    const { countdown } = this.state;
    if (countdown === 0) {
      console.log('IntervalStopped');
      clearInterval(this.decreaseCounter)
    }
  }

  componentDidUpdate() {
    this.stopCounter()
  }

  decreaseCounter = () => {
    setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 0) {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
      } else {
        this.setState({
          timeOver: true,
          nextButtonDisabled: false,
      });
     }
   }, 1000);
  }

  goToNextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      nextButtonDisabled: true,
      countdown: 30,
      timeOver: false,
    }));
  }

  enableAndDisableNextQuestionButton = () => {
    const { nextButtonDisabled } = this.state;
    if (nextButtonDisabled === true) {
      this.setState({ nextButtonDisabled: false });
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
  questionsRedux: stateRedux.playerAndQuestionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiOfQuestionsRedux: (token) => dispatch(fetchApiOfQuestions(token)),
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
