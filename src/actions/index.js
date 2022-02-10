export const WALLET_USER = 'WALLET_USER';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_COINS = 'FETCH_COINS';
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
