import {
  WALLET_USER,
  FETCH_COINS_SUCCESS,
  EDIT_DESPESA,
  DELETE_DESPESA } from '../actions';

const INIT_STATE = {
  currencies: [],
  expenses: [],
};

const editarDespesas = (despesa, objeto) => ({
  id: despesa.id,
  value: objeto.value,
  description: objeto.description,
  currency: objeto.currency,
  method: objeto.method,
  tag: objeto.tag,
  exchangeRates: despesa.payload,
});

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
  case EDIT_DESPESA:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload
          ? editarDespesas(expense, action.objeto) : expense
      )),
    };
  case DELETE_DESPESA:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
