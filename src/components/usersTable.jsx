import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table.jsx";
import auth from "../services/authService";

class UsersTable extends React.Component {
  currentUser = auth.getCurrentUser();

  columns = [
    { path: "identityCardNo", label: "TC Kimlik No" },
    {
      path: "name",
      label: "İsim",
      content: user => (
        <div>
          {this.currentUser.isAdmin && (
            <Link key={`link_${user._id}`} to={`/management/user/${user._id}`}>
              {user.name}
            </Link>
          )}
          {!this.currentUser.isAdmin && <span>{user.name}</span>}
        </div>
      )
    },
    { path: "email", label: "Email" },
    { path: "block", label: "Blok" },
    { path: "doorNumber", label: "Daire No" },
    {
      key: "delete",
      content: user => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(user);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { users, sortColumn, onSort } = this.props;
    let columns = [...this.columns];
    if (!this.currentUser || !this.currentUser.isAdmin) {
      columns.pop({ key: "delete" });
    }
    return (
      <Table
        columns={columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
