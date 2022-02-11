export const WALLET_USER = 'WALLET_USER';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_COINS = 'FETCH_COINS';
export const DELETE_DESPESA = 'DELETE_DESPESA';
export const EDIT_DESPESA = 'EDIT_DESPESA';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const walletUser = (payload) => ({
  type: WALLET_USER,
  payload,
});

export const getCoinsSuccess = (payload, objeto) => ({
  type: FETCH_COINS_SUCCESS,
  payload,
  objeto,
});

export const getCoins = (objeto) => async (dispatch) => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  console.log(response);
  return dispatch(getCoinsSuccess(response, objeto));
};

export const deleteDespesas = (payload) => ({
  type: DELETE_DESPESA,
  payload,
});

export const editDespesas = (payload, objeto) => ({
  type: EDIT_DESPESA,
  payload,
  objeto,
});
