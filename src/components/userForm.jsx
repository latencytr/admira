import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import _ from "lodash";
import { toast } from "react-toastify";

class UserForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      block: "",
      doorNumber: "",
      isAdmin: ""
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    identityCardNo: Joi.string()
      .length(11)
      .required()
      .label("TC Kimlik No"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Şifre"),
    name: Joi.string()
      .required()
      .label("İsim"),
    block: Joi.string()
      .min(1)
      .max(1)
      .required()
      .label("Blok"),
    doorNumber: Joi.number()
      .max(30)
      .required()
      .label("Daire No"),
    isAdmin: Joi.bool()
      .required()
      .label("Admin")
  };

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== "new"
    ) {
      const { data: user } = await userService.getUser(
        this.props.match.params.id
      );
      const data = {
        ..._.pick(user, [
          "_id",
          "identityCardNo",
          "email",
          "name",
          "block",
          "doorNumber",
          "isAdmin"
        ]),
        password: ""
      };
      this.setState({ data });
    }
  }

  doSubmit = async () => {
    try {
      await userService.saveUser(this.state.data);
      toast.success("Kayıt başarılı.");
      this.props.history.push("/management/users");
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
      <main className="container-fluid">
        <h3>Kullanıcı Ekle/Düzenle</h3>
        <div className="col-auto" />
        <div className="col-sm-auto col-md-5 col-lg-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Şifre", "password")}
            {this.renderInput("name", "İsim")}
            {this.renderInput("identityCardNo", "TC Kimlik No", "number")}
            {this.renderSelect(
              "block",
              "Blok",
              [{ name: "A" }, { name: "B" }],
              "name",
              "name"
            )}
            {this.renderInput("doorNumber", "Daire No", "number")}
            {this.renderSelect(
              "isAdmin",
              "Admin",
              [{ name: "Evet", value: true }, { name: "Hayır", value: false }],
              "name",
              "value"
            )}
            {this.renderButton("Kaydet")}
          </form>
        </div>
        <div className="col-auto" />
      </main>
    );
  }
}

export default UserForm;
