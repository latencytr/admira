import React, { Component } from "react";
import Register from "./register";
import ListGroup from "./common/listGroup";

class Management extends Component {
  state = {
    listItems: [
      { name: "Kullanıcı Ekle", path: "register" },
      { name: "Kullanıcı Listesi", path: "users" }
    ],
    activePage: ""
  };
  handleItemChange = item => {
    const activePage = item.path;
    this.setState({ activePage });
  };
  render() {
    const { activePage } = this.state;
    return (
      <div className="container-fluid">
        <h2 className="row">Uygulama Yönetimi</h2>
        <hr />
        <div className="row">
          <div className="col-2">
            <ListGroup
              listItems={this.state.listItems}
              valueProperty="path"
              onItemChange={this.handleItemChange}
            />
          </div>
          <div className="col">
            {activePage === "register" && <Register />}
            {activePage === "users" && (
              <div className="container">
                <h3>Kullanıcı Listesi</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Management;
