import { LOGIN_USER } from '../actions';

const INIT_STATE = {
  email: '',
};

const user = (state = INIT_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
