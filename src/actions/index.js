export const LOGIN_USER = 'LOGIN_USER';
export const WALLET_USER = 'WALLET_USER';

export const loginUser = (event) => ({
  type: LOGIN_USER,
  payload: event.target.value,
});

export const walletUser = (payload) => ({
  type: WALLET_USER,
  payload,
});
