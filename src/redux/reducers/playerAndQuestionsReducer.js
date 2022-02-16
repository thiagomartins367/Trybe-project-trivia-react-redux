import { GET_QUESTIONS, PLAYER_REDUCER } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  questions: [],
  players: [],
};

const playerAndQuestionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_REDUCER:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.playerName,
        gravatarEmail: action.playerEmail,
      },
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default playerAndQuestionsReducer;
