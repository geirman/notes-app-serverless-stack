import React, { Component } from "react";
import { Alert, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import "./Login.css";

import { withRouter } from "react-router-dom";
import config from "../config.js";

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

import Confetti from "react-dom-confetti";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  login(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const authenticationData = {
      isLoading: false,
      Username: username,
      Password: password
    };

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result.getIdToken().getJwtToken()),
        onFailure: err => reject(err)
      })
    );
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const userToken = await this.login(
        this.state.username,
        this.state.password
      );
      this.props.updateUserToken(userToken);
    } catch (e) {
      this.setState({ 
        isLoading: false,
        errorMessage: e.message
      });
    }
  };

  render() {
    const config = {
      angle: 90,
      spread: 60,
      startVelocity: 20,
      elementCount: 40,
      decay: 0.95
    };
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage.length > 0 && <Alert bsStyle="danger">{this.state.errorMessage}</Alert>}
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Confetti active={this.state.isLoading} config={config} />
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
