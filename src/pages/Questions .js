import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { fetchApiOfQuestions } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: [1],
    }
  }

  componentDidMount() {
    const { fetchApiOfQuestionsRedux, tokenAPi } = this.props;
    fetchApiOfQuestionsRedux(tokenAPi);
  }

  render() {
    const { currentQuestion } = this.state;
    const { questionsRedux } = this.props; //correct_answer //incorrect_answer
    return (
      <section>
        <h1>Tela de Jogo</h1>
        <Header />
        {
          questionsRedux.length > 0
          && currentQuestion.map((element) => (
            <QuestionCard
              key={ questionsRedux[element - 1].question }
              category={ questionsRedux[element - 1].category }
              questionContent={ questionsRedux[element - 1].question }
              correctAnswer={ questionsRedux[element - 1].correct_answer }
              incorrectAnswers={ questionsRedux[element - 1].incorrect_answers }
              dataTestidCategory="question-category"
              dataTestidQuestion="question-text"
            />
          ))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Questions);