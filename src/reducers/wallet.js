import { WALLET_USER } from '../actions';

const INIT_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INIT_STATE, action) => {
  switch (action.type) {
  case WALLET_USER:
    return {
      ...state,
      currencies: action.payload,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
