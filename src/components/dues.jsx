import React from "react";
import { getUsers } from "../services/userService";
import { getDues, deleteDue } from "../services/dueService";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../components/utils/paginate";
import DuesTable from "./duesTable.jsx";
import Select from "./common/select.jsx";
import _ from "lodash";
import MainLayout from "./common/mainLayout";
import { toast } from "react-toastify";
import auth from "../services/authService";

class Dues extends React.Component {
  currentUser = auth.getCurrentUser();
  constructor() {
    super();
    this.state = {
      dues: [],
      users: [],
      userId: null,
      currentPage: 1,
      pageSize: 20,
      searchQuery: "",
      sortColumn: { path: "dueDate", order: "asc" }
    };
  }

  async componentDidMount() {
    const { data: users } = await getUsers();
    let { data: dues } = await getDues();
    this.setState({ users, dues });
  }

  handleDelete = async due => {
    let dues = [...this.state.dues];
    try {
      await deleteDue(due._id);
      dues = dues.filter(q => q._id !== due._id);
      toast.success("Aidat bilgisi silindi.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Aidat bilgisi zaten silinmiş.");
      else if (ex.response && ex.response.status === 403)
        toast.error("Aidat bilgisi silmek için yetkili değilsiniz.");
    }
    this.setState({ dues });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleUserFilter = userId => {
    this.setState({ userId });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      dues: allDues,
      userId
    } = this.state;
    let filtered = allDues;
    if (userId) filtered = allDues.filter(q => q.userId === userId);
    if (this.currentUser && !this.currentUser.isAdmin)
      filtered = allDues.filter(q => q.userId === this.currentUser._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const dues = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: dues };
  };

  render() {
    const { pageSize, currentPage, sortColumn, users } = this.state;
    const { totalCount, data: dues } = this.getPagedData();

    return (
      <React.Fragment>
        <MainLayout title="Aidat Bilgileri">
          <div className="row">
            <div className="col">
              <div className="my-3">
                Veritabanındaki {totalCount} aidat bilgisi gösteriliyor.
              </div>
              {this.currentUser && this.currentUser.isAdmin && (
                <Select
                  style={{ width: 200 }}
                  name="userId"
                  label="Kullanıcı Filtreleme:"
                  items={users}
                  onChange={e => {
                    this.handleUserFilter(e.currentTarget.value);
                  }}
                />
              )}
              <div>
                <DuesTable
                  dues={dues}
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
        </MainLayout>
      </React.Fragment>
    );
  }
}

export default Dues;
