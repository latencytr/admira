import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as dueService from "../services/dueService";
import * as priceService from "../services/priceService";
import _ from "lodash";
import { toast } from "react-toastify";

class DueFormAll extends Form {
  state = {
    data: {
      dueDate: "",
      duePrice: "",
      priceId: ""
    },
    prices: [],
    errors: {}
  };
  schema = {
    dueDate: Joi.date()
      .required()
      .label("Aidat Tarihi"),
    duePrice: Joi.number()
      .required()
      .label("Tutar"),
    priceId: Joi.string().label("Fiyat Bilgisi")
  };

  async componentDidMount() {
    const { data: prices } = await priceService.getPrices();
    this.setState({ prices });
  }

  doSubmit = async () => {
    try {
      const { dueDate, duePrice, priceId } = this.state.data;
      const date = new Date(dueDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      await dueService.saveMonthlyDueForAllUsers(
        month,
        year,
        duePrice,
        priceId
      );
      toast.success("Kayıtlar başarılı.");
      this.props.history.push("/management/dues");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { prices } = this.state;
    return (
      <main className="container-fluid">
        <h3>Toplu Aidat Ekleme</h3>
        <div className="col-auto" />
        <div className="col-sm-auto col-md-5 col-lg-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("dueDate", "Aidat Tarihi", "date")}
            {this.renderInput("duePrice", "Tutar", "number")}
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

export default DueFormAll;
