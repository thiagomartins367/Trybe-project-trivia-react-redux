import { PLAYER_REDUCER } from '../actions';

const INITIAL_STATE = {
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
      player: action.player,
      players: action.players,
    };
  default:
    return state;
  }
};

export default playerReducer;
