import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoins, editDespesas, deleteDespesas } from '../actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      newId: 0,
    };
  }

  componentDidMount() {
    this.fetchAPI();
    this.total = 0;
  }

  fetchAPI = async () => {
    const fetchURL = await fetch(URL);
    const response = await fetchURL.json();
    const data = this.setState({ coins: Object.keys(response) });
    return data;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // função feita com ajuda do colega Matheus Reush
  upDateTotal = () => {
    this.total = 0;
    const { despesas } = this.props;
    despesas.map(
      (despesa) => {
        (this.total -= -(
          despesa.value * despesa.exchangeRates[despesa.currency].ask
        ));
        return null;
      },
    );
  }

  render() {
    const { coins, value, id, currency, description, tag, method, newId } = this.state;
    const {
      dispatchEdit, dispatchDelete, dispatchFetchCoins, despesas, email } = this.props;
    this.upDateTotal();
    return (
      <>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h3 data-testid="total-field">{ this.total }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <label htmlFor="despesas">
          Despesas
          <input
            type="text"
            name="value"
            value={ value }
            id="despesas"
            onChange={ (event) => this.handleChange(event) }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição
          <input
            type="text"
            name="description"
            value={ description }
            id="descricao"
            onChange={ (event) => this.handleChange(event) }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="coins">
          Moeda
          <select
            name="currency"
            id="coins"
            value={ currency }
            onChange={ (event) => this.handleChange(event) }
            data-testid="currency-input"
          >
            {
              coins.map((coin) => coin !== 'USDT'
                && (
                  <option
                    key={ coin }
                    data-testid={ coin }
                    value={ coin }
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
            name="method"
            id="metodo"
            value={ method }
            onChange={ (event) => this.handleChange(event) }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ (event) => this.handleChange(event) }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => {
            dispatchFetchCoins({
              id,
              value,
              method,
              currency,
              tag,
              description,
            });
            this.setState((prevState) => ({
              id: prevState.id + 1,
              value: '',
            }));
          } }
        >
          Adicionar despesa
        </button>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((despesa) => (
              <tr key={ Math.random() }>
                <td>{ despesa.description }</td>
                <td>{ despesa.tag }</td>
                <td>{ despesa.method }</td>
                <td>{ Number(despesa.value).toFixed(2) }</td>
                <td>
                  {
                    despesa.exchangeRates[despesa.currency].name.split('/')[0]
                  }
                </td>
                <td>
                  {
                    Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    Number(despesa.value
                      * despesa.exchangeRates[despesa.currency].ask).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => {
                      dispatchEdit(newId, {
                        id, currency, value, description, tag, method,
                      });
                      this.setState({ newId: despesa.id });
                    } }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => dispatchDelete(despesa.id) }
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatchFetchCoins: PropTypes.func.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
  dispatchDelete: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCoins: (objeto) => dispatch(getCoins(objeto)),
  dispatchEdit: (id, objeto) => dispatch(editDespesas(id, objeto)),
  dispatchDelete: (objeto) => dispatch(deleteDespesas(objeto)),

});

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  email: state.user.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
