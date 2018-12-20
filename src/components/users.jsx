import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../components/utils/paginate";
import UsersTable from "./usersTable.jsx";

import { getUsers, deleteUser } from "../services/userService";
import { getDues } from "../services/dueService";
import auth from "../services/authService";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      dues: [],
      currentPage: 1,
      pageSize: 4,
      searchQuery: "",
      sortColumn: { path: "name", order: "asc" }
    };
  }

  async componentDidMount() {
    const { data: users } = await getUsers();
    const { data: dues } = await getDues();
    this.setState({ users, dues });
  }

  handleDelete = async user => {
    const isUserHasDue = this.state.dues.filter(q => q.userId === user._id);
    console.log(isUserHasDue.length);
    if (isUserHasDue.length > 0) {
      toast.error(
        "Kullanıcının üzerine kayıtlı aidatlar bulunmaktadır. Kullanıcıyı silmeden önce tanımlı aidatları siliniz."
      );
      return;
    }
    let users = [...this.state.users];

    try {
      await deleteUser(user._id);
      users = users.filter(q => q._id !== user._id);
      toast.success("Kullanıcı silindi.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Kullanıcı zaten silindi.");
      else if (ex.response && ex.response.status === 403)
        toast.error("Kullanıcı silmek için yetkili değilsiniz.");
    }
    this.setState({ users });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      users: allUsers
    } = this.state;
    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(q =>
        q.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: users } = this.getPagedData();
    const { user } = auth.getCurrentUser();

    return (
      <React.Fragment>
        <div className="row">
          <h3>Kullanıcı Listesi</h3>
        </div>
        <div className="row">
          <div className="col">
            <p>Veritabanındaki {totalCount} kullanıcı gösteriliyor.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div>
              <UsersTable
                users={users}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
