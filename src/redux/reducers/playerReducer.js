import { PLAYER_REDUCER } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  players: [],
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_REDUCER:
    return {
      ...state,
      token: action.token,
      player: action.player,
      players: action.players,
    }
  default:
    return state;
  }
};

export default playerReducer;
