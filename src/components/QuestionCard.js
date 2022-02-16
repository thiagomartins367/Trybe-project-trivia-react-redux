import React, { Component } from 'react';

class QuestionCard extends Component {
  render() {
    const {
      category,
      questionContent,
      correctAnswer,
      incorrectAnswers,
      dataTestidCategory,
      dataTestidQuestion,
    } = this.props;
    const RANDOM_LOGIC_NUMBER = 0.5;
    const questionsList = [...incorrectAnswers, correctAnswer];
    const indexsQuestionsList = [];
    questionsList.forEach((element, index) => {
      indexsQuestionsList.push(index);
    });
    const randomIndexs = indexsQuestionsList.sort(
      () => Math.random() - RANDOM_LOGIC_NUMBER,
    );
    // console.log('randomIndexs: ', randomIndexs);
    const randomQuestions = [];
    randomIndexs.forEach((elementIndex) => {
      randomQuestions.push(questionsList[elementIndex]);
    });
    // console.log('questionsList: ', questionsList);
    // console.log('randomQuestions: ', randomQuestions);
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
              <button
                key={ element }
                type="button"
                className="answer"
                data-testid={
                  element === correctAnswer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
              >
                {element}
              </button>
            ))
          }
        </section>
        <hr />
        <br />
        <button type="button">Próxima</button>
      </section>
    );
  }
}

export default QuestionCard;
