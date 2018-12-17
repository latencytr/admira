import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService.js";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <main className="container">
        <h3>Kullanıcı Ekle/Düzenle</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Şifre", "password")}
          {this.renderInput("name", "İsim")}
          {this.renderButton("Kaydet")}
        </form>
      </main>
    );
  }
}

export default Register;
