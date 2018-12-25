import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from "../services/authService";
import * as userService from "../services/userService";
import * as priceService from "../services/priceService";
import Table from "./common/table.jsx";

class DuesTable extends React.Component {
  currentUser = auth.getCurrentUser();
  state = { users: [], prices: [] };

  async componentDidMount() {
    const { data: users } = await userService.getUsers();
    const { data: prices } = await priceService.getPrices();
    this.setState({ users, prices });
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
      content: due => {
        const price = this.state.prices.filter(q => q._id === due.priceId)[0];
        let fuelPrice = null;
        let fuelConsumption = null;
        if (due && price && due.fuelConsumption && price.fuelPrice) {
          fuelPrice = (price.fuelPrice * due.fuelConsumption).toFixed(2);
          fuelConsumption = due.fuelConsumption;
        }
        return (
          <div>
            {fuelConsumption && (
              <div>
                {fuelConsumption} m<sup>3</sup>
              </div>
            )}
            {fuelPrice && <div>({fuelPrice} ₺)</div>}
          </div>
        );
      }
    },
    {
      path: "waterConsumption",
      label: "Su Tüketimi",
      content: due => {
        const price = this.state.prices.filter(q => q._id === due.priceId)[0];
        let waterPrice = null;
        let waterConsumption = null;
        if (due && price && due.waterConsumption && price.waterPrice) {
          waterPrice = (price.waterPrice * due.waterConsumption).toFixed(2);
          waterConsumption = due.waterConsumption;
        }
        return (
          <div>
            {waterConsumption && (
              <div>
                {due.waterConsumption} m<sup>3</sup>
              </div>
            )}
            {waterPrice && <div>({waterPrice} ₺)</div>}
          </div>
        );
      }
    },

    {
      path: "duePrice",
      label: "Aidat Tutarı",
      content: due => <div>{due.duePrice} ₺</div>
    },
    {
      key: "totalPrice",
      label: "Toplam Tutar",
      content: due => {
        const price = this.state.prices.filter(q => q._id === due.priceId)[0];
        const { fuelPrice, waterPrice } = { ...price };
        let totalPrice = due.duePrice;
        if (due.waterConsumption && waterPrice)
          totalPrice += due.waterConsumption * waterPrice;
        if (due.fuelConsumption && fuelPrice)
          totalPrice += due.fuelConsumption * fuelPrice;
        return <div>{totalPrice && <div>{totalPrice.toFixed(2)} ₺</div>}</div>;
      }
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
