import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import ProtectedRoute from "./common/protectedRoute";
import ListGroup from "./common/listGroup";
import * as authService from "../services/authService";

import UserForm from "./userForm";
import Users from "./users";
import PriceForm from "./priceForm";
import Prices from "./prices";
import DueFormAll from "./dueFormAll";
import Dues from "./dues";
import DueForm from "./dueForm";

class Management extends Component {
  state = {
    selectedItem: {},
    listItems: [
      { name: "Kullanıcı Ekle", path: "/management/user/new" },
      { name: "Kullanıcı Listesi", path: "/management/users" },
      { name: "Fiyat Ekle", path: "/management/price/new" },
      { name: "Fiyat Listesi", path: "/management/prices" },
      { name: "Toplu Aidat Ekleme", path: "/management/dueForAll" },
      { name: "Aidat Ekle", path: "/management/due/new" },
      { name: "Aidatlar", path: "/management/dues" }
    ]
  };

  componentDidMount() {
    const user = authService.getCurrentUser();
    if (user && !user.isAdmin) {
      this.props.history.push("/not-found");
    }
  }

  handleItemChange = item => {
    this.setState({ selectedItem: item });
    this.props.history.push(item.path);
  };

  render() {
    return (
      <div className="container-fluid">
        <h2 className="row">Uygulama Yönetimi</h2>
        <hr />
        <div className="row">
          <div className="col-auto">
            <ListGroup
              listItems={this.state.listItems}
              selectedItem={this.state.selectedItem}
              valueProperty="path"
              onItemChange={this.handleItemChange}
            />
          </div>
          <div className="col">
            <Switch>
              <ProtectedRoute
                path="/management/user/:id"
                component={UserForm}
              />
              <ProtectedRoute path="/management/user/" component={UserForm} />
              <ProtectedRoute path="/management/users" component={Users} />
              <ProtectedRoute
                path="/management/price/:id"
                component={PriceForm}
              />
              <ProtectedRoute path="/management/price/" component={PriceForm} />
              <ProtectedRoute path="/management/prices" component={Prices} />
              <ProtectedRoute path="/management/due/:id" component={DueForm} />
              <ProtectedRoute path="/management/due/" component={DueForm} />
              <ProtectedRoute
                path="/management/dueForAll"
                component={DueFormAll}
              />
              <ProtectedRoute path="/management/dues" component={Dues} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Management;
