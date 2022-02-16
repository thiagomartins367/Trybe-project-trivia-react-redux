export const PLAYER_REDUCER = 'PLAYER_REDUCER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const playerAction = (player) => ({
  type: PLAYER_REDUCER,
  player,
});

const saveTokenInRedux = (token) => ({
  type: GET_TOKEN,
  token,
});

const saveQuestionsInRedux = (data) => ({
  type: GET_QUESTIONS,
  questions: data,
});

export const fetchApi = () => async (dispatch) => {
  try {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    // console.log('token: ', data.token);
    dispatch(saveTokenInRedux(data.token));
    const urlApiQuestion = `https://opentdb.com/api.php?amount=5&token=${data.token}`;
    const responceQuestions = await fetch(urlApiQuestion);
    const dataQuestions = await responceQuestions.json();
    // console.log('dataQuestions: ', dataQuestions);
    dispatch(saveQuestionsInRedux(dataQuestions.results));
  } catch (error) {
    console.log('ERROR REQUEST "fetchApi" :', error);
  }
  // return fetch(URL)
  //   .then((response) => response.json())
  //   .then((data) => dispatch(saveTokenInRedux(data.token)))
  //   .catch((error) => console.log('ERROR REQUEST "fetchApi" :', error));
};