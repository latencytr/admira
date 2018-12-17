import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import auth from "../services/authService";

class MoviesTable extends React.Component {
  user = auth.getCurrentUser();
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => (
        <div>
          {this.user && (
            <Link key={`link_${movie._id}`} to={`/movies/${movie._id}`}>
              {movie.title}
            </Link>
          )}
          {!this.user && <span>{movie.title}</span>}
        </div>
      )
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.selected} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(movie);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    let columns = [...this.columns];
    if (!this.user || !this.user.isAdmin) {
      columns.pop({ key: "delete" });
    }
    return (
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
