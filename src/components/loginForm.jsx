import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService.js";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/about";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/about" />;
    return (
      <div className="row">
        <div className="col" />
        <div className="col login-form">
          <h1 className="text-center">Kullanıcı Girişi</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Şifre", "password")}
            {this.renderButton("Giriş")}
          </form>
        </div>
        <div className="col" />
      </div>
    );
  }
}

export default LoginForm;
