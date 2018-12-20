import React from "react";
import { getDues, deleteDue } from "../services/dueService";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../components/utils/paginate";
import DuesTable from "./duesTable.jsx";
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
      currentPage: 1,
      pageSize: 8,
      searchQuery: "",
      sortColumn: { path: "dueDate", order: "asc" }
    };
  }

  async componentDidMount() {
    let { data: dues } = await getDues();
    this.setState({ dues });
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

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, dues: allDues } = this.state;
    let filtered = allDues;
    if (this.currentUser && !this.currentUser.isAdmin)
      filtered = allDues.filter(q => q.userId === this.currentUser._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const dues = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: dues };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: dues } = this.getPagedData();

    return (
      <React.Fragment>
        <MainLayout title="Aidat Bilgileri">
          <div className="row">
            <div className="col">
              <div className="my-3">
                Veritabanındaki {totalCount} aidat bilgisi gösteriliyor.
              </div>
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
