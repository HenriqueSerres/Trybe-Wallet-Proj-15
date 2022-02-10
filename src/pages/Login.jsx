import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';
// peguei regex do site stackoverflow
const CINCO = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputSenha: '',
      inputEmail: '',
    };
  }

  onSubmitButton = () => {
    const { history, salvarEmail } = this.props;
    const { inputEmail } = this.state;
    salvarEmail(inputEmail);
    history.push('/carteira');
  }

  validInputs = () => {
    const { inputSenha, inputEmail } = this.state;
    if (this.verifyInputEmail(inputEmail) && inputSenha.length >= CINCO) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  verifyInputEmail = (email) => {
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    return EMAIL_REGEX.test(email);
  }

  render() {
    const { isDisabled, inputSenha, inputEmail } = this.state;
    return (
      <form>
        <input
          type="text"
          name="email"
          value={ inputEmail }
          onChange={ (event) => {
            this.setState({ inputEmail: event.target.value });
            this.validInputs();
          } }
          data-testid="email-input"
        />
        <input
          type="password"
          name="inputSenha"
          value={ inputSenha }
          onChange={ (event) => {
            this.setState({ inputSenha: event.target.value });
            this.validInputs();
          } }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.onSubmitButton }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
  salvarEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  salvarEmail: (email) => dispatch(saveEmail(email)),
});

// const mapDispatchToProps = (dispatch) => ({
//   emailDispatch: (e) => dispatch(loginUser(e)),
// });

export default connect(null, mapDispatchToProps)(Login);
