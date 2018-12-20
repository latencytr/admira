import React from "react";
import { getPrices, deletePrice } from "../services/priceService";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../components/utils/paginate";
import PricesTable from "./pricesTable.jsx";
import _ from "lodash";
import { toast } from "react-toastify";

class Prices extends React.Component {
  constructor() {
    super();
    this.state = {
      prices: [],
      currentPage: 1,
      pageSize: 4,
      sortColumn: { path: "priceDate", order: "asc" }
    };
  }

  async componentDidMount() {
    let { data: prices } = await getPrices();
    this.setState({ prices });
  }

  handleDelete = async price => {
    let prices = [...this.state.prices];
    try {
      await deletePrice(price._id);
      prices = prices.filter(q => q._id !== price._id);
      toast.success("Fiyat bilgisi silindi.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Fiyat bilgisi zaten silinmiş.");
      else if (ex.response && ex.response.status === 403)
        toast.error("Fiyat bilgisi silmek için yetkili değilsiniz.");
    }
    this.setState({ prices });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, prices: allPrices } = this.state;
    let filtered = allPrices;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const prices = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: prices };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: prices } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <h3>Fiyat Bilgileri</h3>
        </div>
        <div className="row">
          <div className="col">
            <div className="my-3">
              Veritabanındaki {totalCount} fiyat bilgisi gösteriliyor.
            </div>
            <div>
              <PricesTable
                prices={prices}
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

export default Prices;
