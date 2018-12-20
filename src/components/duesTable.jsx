import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from "../services/authService";
import * as userService from "../services/userService";
import Table from "./common/table.jsx";

class DuesTable extends React.Component {
  currentUser = auth.getCurrentUser();
  state = { users: [] };

  async componentDidMount() {
    const { data: users } = await userService.getUsers();
    this.setState({ users });
  }

  getUser = id => {
    return this.state.users.filter(q => q._id === id)[0];
  };

  columns = [
    {
      path: "dueDate",
      label: "Aidat Tarihi",
      content: due => {
        const date = new Date(due.dueDate);
        const dateString = `${date.getMonth() +
          1}/${date.getDate()}/${date.getFullYear()}`;
        return (
          <div>
            {this.currentUser.isAdmin && (
              <Link key={`link_${due._id}`} to={`/management/due/${due._id}`}>
                {dateString}
              </Link>
            )}
            {!this.currentUser.isAdmin && <span>{dateString}</span>}
          </div>
        );
      }
    },
    {
      path: "fuelConsumption",
      label: "Yakıt Tüketimi",
      content: due => (
        <div>
          {due.fuelConsumption} m<sup>3</sup>
        </div>
      )
    },
    {
      path: "waterConsumption",
      label: "Su Tüketimi",
      content: due => (
        <div>
          {due.waterConsumption} m<sup>3</sup>
        </div>
      )
    },
    {
      path: "paymentDate",
      label: "Ödeme Tarihi",
      content: due => {
        if (due.paymentDate) {
          const date = new Date(due.paymentDate);
          const dateString = `${date.getMonth() +
            1}/${date.getDate()}/${date.getFullYear()}`;
          return <div>{dateString}</div>;
        } else {
          return "";
        }
      }
    },
    {
      path: "duePrice",
      label: "Aidat Tutarı",
      content: due => <div>{due.duePrice} ₺</div>
    },
    {
      key: "isPaid",
      label: "Ödendi",
      content: due => (
        <FontAwesomeIcon
          icon={due.paymentDate ? ["far", "smile"] : ["far", "frown"]}
        />
      )
    },
    {
      key: "userId",
      path: "userId",
      label: "Kullanıcı",
      content: due => {
        const user = this.getUser(due.userId);
        if (user) return <div>{user.name}</div>;
        else return;
      }
    },
    {
      key: "delete",
      content: due => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(due);
          }}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { dues, sortColumn, onSort } = this.props;
    let columns = [...this.columns];
    if (!this.currentUser || !this.currentUser.isAdmin) {
      columns.pop({ key: "delete" });
      columns.pop({ key: "userId" });
    }
    return (
      <Table
        columns={columns}
        data={dues}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DuesTable;
