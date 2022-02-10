import { SAVE_EMAIL } from '../actions';

const INIT_STATE = {
  email: '',
};

const user = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
