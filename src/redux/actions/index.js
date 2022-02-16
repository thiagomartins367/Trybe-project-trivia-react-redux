export const PLAYER_REDUCER = 'PLAYER_REDUCER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const playerAction = (playerName, playerEmail) => ({
  type: PLAYER_REDUCER,
  playerName,
  playerEmail,
});

const saveTokenInRedux = (token) => ({
  type: GET_TOKEN,
  token,
});

const saveQuestionsInRedux = (data) => ({
  type: GET_QUESTIONS,
  questions: data,
});

export const fetchApiToken = () => async (dispatch) => {
  try {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveTokenInRedux(data.token));
    // console.log('token: ', data.token);
  } catch (error) {
    console.log('ERROR REQUEST "fetchApiToken" :', error);
  }
};

export const fetchApiOfQuestions = (token) => async (dispatch) => {
  try {
    let urlApiQuestion = `https://opentdb.com/api.php?amount=5&token=${token}`;
    let responceQuestions = await fetch(urlApiQuestion);
    let dataQuestions = await responceQuestions.json();
    // console.log('dataQuestions ANTES: ', dataQuestions);
    if (dataQuestions.results.length === 0) {
      const URL = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(URL);
      const dataToken = await response.json();
      // console.log('dataToken: ', dataToken);
      urlApiQuestion = `https://opentdb.com/api.php?amount=5&token=${dataToken.token}`;
      responceQuestions = await fetch(urlApiQuestion);
      dataQuestions = await responceQuestions.json();
    }
    // console.log('dataQuestions DEPOIS: ', dataQuestions);
    dispatch(saveQuestionsInRedux(dataQuestions.results));
  } catch (error) {
    console.log('ERROR REQUEST "fetchApiOfQuestions" :', error);
  }
};
