import React, { Component } from "react";

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
    const questionsList = [...incorrectAnswers, correctAnswer];
    const randomQuestions = [...incorrectAnswers, correctAnswer];
    randomQuestions.sort();
    // questionsList.forEach(() => {
    //   const index = Number((Math.random() * 10).toFixed(0));
    //   console.log('index: ', index);
    //   const random = (questionsList.length - 1) - index;
    //   console.log('random: ', random);
    //   const randomizeIndex = index + random;
    //   console.log('randomizeIndex: ', randomizeIndex);
    //   randomQuestions.push(questionsList[randomizeIndex]);
    //   questionsList.shift();
    // });
    console.log('questionsList: ', questionsList);
    console.log('randomQuestions: ', randomQuestions);
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
        <section data-testid="answer-options" className="answer-options">
          {
            randomQuestions.map((element, index) => (
              <button
                key={element}
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