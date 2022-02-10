import React from 'react';
import Header from '../components/Header';

const URL = 'https://economia.awesomeapi.com.br/json/all';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const fetchURL = await fetch(URL);
    const response = await fetchURL.json();
    const data = this.setState({ coins: Object.keys(response) });
    return data;
  }

  render() {
    const { coins } = this.state;
    console.log(coins);
    return (
      <>
        <Header />
        <label htmlFor="despesas">
          Despesas
          <input
            type="text"
            value=""
            id="despesas"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição
          <input
            type="text"
            value=""
            id="descricao"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="coins">
          Moeda
          <select
            name=""
            id="coins"
            data-testid="currency-input"
          >
            {
              coins.map((coin) => coin !== 'USDT'
                && (
                  <option
                    key={ coin }
                    data-testid={ coin }
                  >
                    { coin }
                  </option>
                ))
            }
          </select>
        </label>
        <label htmlFor="metodo">
          Método de pagamento
          <select
            name=""
            id="metodo"
            data-testid="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-credito">Cartão de crédito</option>
            <option value="cartao-debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            name=""
            id="tag"
            data-testid="tag-input"
          >
            <option value="alimetacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

export default Wallet;
