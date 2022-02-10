import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions';
// peguei regex do site stackoverflow
const CINCO = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputSenha: '',
    };
  }

  onSubmitButton = () => {
    const { history } = this.props;
    history.push('/carteira');
  }

  validInputs = () => {
    const { email } = this.props;
    const { inputSenha } = this.state;
    if (this.verifyInputEmail(email) && inputSenha.length >= CINCO) {
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
    const { isDisabled, inputSenha } = this.state;
    const { email, emailDispatch } = this.props;
    return (
      <form>
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ emailDispatch }
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
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (e) => dispatch(loginUser(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
