import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from './GenericButton';

class QuestionCard extends Component {
  render() {
    const {
      category,
      questionContent,
      correctAnswer,
      incorrectAnswers,
      currentQuestion,
      nextQuestionButton,
      dataTestidCategory,
      dataTestidQuestion,
      disableAlternatives,
    } = this.props;
    const currentQuestionStorage = Number(localStorage.getItem('currentQuestion'));
    let randomQuestions = [];
    const questionsList = [...incorrectAnswers, correctAnswer];
    if (currentQuestionStorage !== currentQuestion) {
      const RANDOM_LOGIC_NUMBER = 0.5;
      const indexsQuestionsList = [];
      questionsList.forEach((element, index) => {
        indexsQuestionsList.push(index);
      });
      const randomIndexs = indexsQuestionsList.sort(
        () => Math.random() - RANDOM_LOGIC_NUMBER,
      );
      // console.log('randomIndexs: ', randomIndexs);
      randomIndexs.forEach((elementIndex) => {
        randomQuestions.push(questionsList[elementIndex]);
      });
      // console.log('questionsList: ', questionsList);
      // console.log('randomQuestions: ', randomQuestions);
      localStorage.setItem('currentQuestion', currentQuestion);
      localStorage.setItem('randomQuestions', JSON.stringify(randomQuestions));
    } else {
      randomQuestions = JSON.parse(localStorage.getItem('randomQuestions'));
      console.log('randomQuestions STORAGE: ', randomQuestions);
    }

    return (
      <section className="card-question">
        <section>
          <div data-testid={ dataTestidCategory }>
            { category }
          </div>
          <div>
            <p data-testid={ dataTestidQuestion }>
              { questionContent }
            </p>
          </div>
        </section>
        <section data-testid="answer-options" className="answer-optionss">
          {
            randomQuestions.map((element, index) => (
              <GenericButton
                nameBtn={
                  element === correctAnswer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                key={ element }
                nameBtn={
                  element === correctAnswer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                buttonContent={ element }
                buttonDisabled={ disableAlternatives }
                buttonDataTestid={
                  element === correctAnswer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                classNameButton="answer"
                onClickEvent={ nextQuestionButton }
              />
            ))
          }
        </section>
      </section>
    );
  }
}

QuestionCard.propTypes = {
  category: PropTypes.string,
  questionContent: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  dataTestidCategory: PropTypes.string,
  dataTestidQuestion: PropTypes.string,
  disableAlternatives: PropTypes.bool,
}.isRequired;

export default QuestionCard;
