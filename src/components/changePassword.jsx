import React from "react";
import Form from "./common/form";
import * as userService from "../services/userService";
import * as auth from "../services/authService";

class ChangePassword extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: ""
    },
    errors: []
  };

  validate = () => {
    /** Without validate with a package like Joi */
    const errors = { ...this.state.errors };
    const { password, confirmPassword } = this.state.data;
    if (password !== confirmPassword)
      errors.confirmPassword = "Girilen şifreler aynı olmalıdır.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    /** Without validate with a package like Joi */
    if (name === "password") {
      if (value.trim() === "") return "Şifre gereklidir.";
      if (value.length < 6) return "Şifre minimum 6 karakter olmalıdır.";
      if (value.length > 20) return "Şifre maksimum 20 karakter olmalıdır.";
    }
    if (name === "confirmPassword") {
      if (value.trim() === "") return "Şifre Doğrulama gereklidir.";
      if (value.trim() != this.state.data.password)
        return "Girilen şifreler aynı olmalıdır.";
    }
  };

  doSubmit = async () => {
    try {
      const user = await auth.getCurrentUser();
      await userService.changePassword(user, this.state.data.password);
      await auth.logout();
      await auth.login({
        email: user.email,
        password: this.state.data.password
      });
      this.props.history.goBack();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col login-form">
          <h1 className="text-center">Şifre Değişikliği</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("password", "Şifre", "password")}
            {this.renderInput("confirmPassword", "Şifre Doğrulama", "password")}
            {this.renderButton("Değiştir")}
          </form>
        </div>
        <div className="col" />
      </div>
    );
  }
}

export default ChangePassword;
