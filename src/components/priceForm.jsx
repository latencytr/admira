import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as priceService from "../services/priceService";
import _ from "lodash";
import { toast } from "react-toastify";

class PriceForm extends Form {
  state = {
    data: {
      priceDate: "",
      fuelPrice: "",
      waterPrice: ""
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    priceDate: Joi.date()
      .required()
      .label("Fiyat Tarihi"),
    fuelPrice: Joi.number()
      .required()
      .label("Yakıt Fiyatı"),
    waterPrice: Joi.number()
      .required()
      .label("Su Fiyatı")
  };

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== "new"
    ) {
      const { data } = await priceService.getPrice(this.props.match.params.id);
      const { priceDate } = data;
      const date = new String(priceDate);
      const dateString = date.substr(0, date.indexOf("T"));
      const newData = { ...data, priceDate: dateString };
      this.setState({ data: newData });
    }
  }

  doSubmit = async () => {
    try {
      await priceService.savePrice(this.state.data);
      toast.success("Kayıt başarılı.");
      this.props.history.push("/management/prices");
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
        <h3>Fiyat Bilgisi Ekle/Düzenle</h3>
        <div className="col-auto" />
        <div className="col-sm-auto col-md-5 col-lg-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("priceDate", "Fiyat Tarihi", "date")}
            {this.renderInput("fuelPrice", "Yakıt Fiyatı", "number")}
            {this.renderInput("waterPrice", "Su Fiyatı", "number")}
            {this.renderButton("Kaydet")}
          </form>
        </div>
        <div className="col-auto" />
      </main>
    );
  }
}

export default PriceForm;
