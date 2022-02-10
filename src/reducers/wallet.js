import { WALLET_USER, FETCH_COINS_SUCCESS } from '../actions';

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
  case FETCH_COINS_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: action.objeto.id,
        value: action.objeto.value,
        description: action.objeto.description,
        currency: action.objeto.currency,
        method: action.objeto.method,
        tag: action.objeto.tag,
        exchangeRates: action.payload,
      }],
    };
  default:
    return state;
  }
};

export default wallet;
