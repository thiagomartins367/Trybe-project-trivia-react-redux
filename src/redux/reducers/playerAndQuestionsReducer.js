import { GET_QUESTIONS, PLAYER_REDUCER, SAVE_POINTS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
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
  case SAVE_POINTS:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.payload + state.player.score,
      },
    };

  default:
    return state;
  }
};

export default playerAndQuestionsReducer;
