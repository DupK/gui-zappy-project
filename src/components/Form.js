import React, { Component } from 'react';
import proptypes from 'prop-types';

import '../styles/form.css';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '127.0.0.1:4242',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="Form-content">
        <img className="Form-logo" src={require('../assets/images/astronaut.png')} alt="logo"/>
        <p className="Form-title">Welcome to Zappy</p>
        <p className="Form-subtitle">Network Connection Panel</p>
          <div className="Form-inputs">
            <hr className="Form-separator"/>
              <form onSubmit={ () => this.props.onReceiveIp(this.state.value) }>
                <input
                  maxLength={20}
                  placeholder="localhost:8000"
                  className={this.props.error ? "Form-input-error" : "Form-input" }
                  onChange={ this.handleChange }
                  value={ this.state.value }
                />
                <input
                  name="submit"
                  type="hidden"
                />
              </form>
            <hr className="Form-separator"/>
            <p className="Form-message">{this.props.message}</p>
          </div>
      </div>
    );
  }
}

Form.proptypes = {
  onReceiveIp: proptypes.func.isRequired,
  error: proptypes.bool,
  message: proptypes.string,
};
