import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table.jsx";
import auth from "../services/authService";

class PricesTable extends React.Component {
  currentUser = auth.getCurrentUser();

  columns = [
    {
      path: "priceDate",
      label: "Fiyat Tarihi",
      content: price => {
        const date = new Date(price.priceDate);
        const dateString = `${date.getMonth() +
          1}/${date.getDate()}/${date.getFullYear()}`;
        return (
          <div>
            {this.currentUser.isAdmin && (
              <Link
                key={`link_${price._id}`}
                to={`/management/price/${price._id}`}
              >
                {dateString}
              </Link>
            )}
            {!this.currentUser.isAdmin && <span>{dateString}</span>}
          </div>
        );
      }
    },
    {
      path: "fuelPrice",
      label: "Yakıt Fiyatı",
      content: price => <div>{price.fuelPrice} ₺</div>
    },
    {
      path: "waterPrice",
      label: "Su Fiyatı",
      content: price => <div>{price.waterPrice} ₺</div>
    },
    {
      key: "delete",
      content: price => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(price);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { prices, sortColumn, onSort } = this.props;
    let columns = [...this.columns];
    if (!this.currentUser || !this.currentUser.isAdmin) {
      columns.pop({ key: "delete" });
    }
    return (
      <Table
        columns={columns}
        data={prices}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PricesTable;
