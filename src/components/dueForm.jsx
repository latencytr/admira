import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { toast } from "react-toastify";

import Form from "./common/form";
import * as dueService from "../services/dueService";
import * as userService from "../services/userService";
import * as priceService from "../services/priceService";

class DueForm extends Form {
  state = {
    data: {
      dueDate: "",
      duePrice: "",
      userId: "",
      priceId: ""
    },
    users: [],
    prices: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    dueDate: Joi.date()
      .required()
      .label("Aidat Tarihi"),
    duePrice: Joi.number()
      .required()
      .label("Tutar"),
    paymentDate: Joi.date().label("Ödeme Tarihi"),
    fuelConsumption: Joi.number().label("Yakıt Tüketimi"),
    waterConsumption: Joi.number().label("Su Tüketimi"),
    userId: Joi.string()
      .required()
      .label("Kullanıcı Id"),
    priceId: Joi.string().label("Fiyat Id")
  };

  async componentDidMount() {
    const { data: users } = await userService.getUsers();
    const { data: prices } = await priceService.getPrices();
    this.setState({ users, prices });

    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== "new"
    ) {
      const { data } = await dueService.getDue(this.props.match.params.id);
      const { dueDate, paymentDate } = data;
      const ddate = new String(dueDate);
      const ddateString = ddate.substr(0, ddate.indexOf("T"));
      const pdate = new String(paymentDate);
      const pdateString = pdate.substr(0, pdate.indexOf("T"));
      const newData = {
        ...data,
        dueDate: ddateString,
        paymentDate: pdateString
      };
      this.setState({ data: newData });
    }
  }

  doSubmit = async () => {
    try {
      console.log(this.state.data);
      await dueService.saveDue(this.state.data);
      toast.success("Kayıt başarılı.");
      window.location = "/management/dues";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { users, prices } = this.state;
    return (
      <main className="container-fluid">
        <h3>Aidat Ekle/Düzenle</h3>
        <div className="col-auto" />
        <div className="col-sm-auto col-md-5 col-lg-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("dueDate", "Aidat Tarihi", "date")}
            {this.renderInput("duePrice", "Tutar", "number")}
            {this.renderInput("paymentDate", "Ödeme Tarihi", "date")}
            {this.renderInput("fuelConsumption", "Yakıt Tüketimi", "number")}
            {this.renderInput("waterConsumption", "Su Tüketimi", "number")}
            {this.renderSelect("userId", "Kullanıcı", users, "name", "_id")}
            {this.renderSelect(
              "priceId",
              "Fiyatlar",
              prices,
              "priceDate",
              "_id"
            )}
            {this.renderButton("Kaydet")}
          </form>
        </div>
        <div className="col-auto" />
      </main>
    );
  }
}

export default DueForm;
