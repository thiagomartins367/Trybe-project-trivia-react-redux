import { PLAYER_REDUCER, SAVE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_REDUCER:
    return {
      ...state,
      name: action.playerName,
      gravatarEmail: action.playerEmail,
    };
  case SAVE_POINTS:
    return {
      ...state,
      score: action.payload + state.score,
    };

  default:
    return state;
  }
};

export default player;