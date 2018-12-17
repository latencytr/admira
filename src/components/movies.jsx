import React from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../components/utils/paginate";
import ListGroup from "./common/listGroup.jsx";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import auth from "../services/authService";

class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      searchQuery: "",
      selectedGenre: { _id: "", name: "All Genres" },
      sortColumn: { path: "title", order: "asc" }
    };
  }

  async componentDidMount() {
    let { data: movies } = await getMovies();
    movies = movies.map(m => {
      return { ...m, selected: false };
    });
    const { data: genreList } = await getGenres();
    let genres = [{ _id: "", name: "All Genres" }, ...genreList];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    let movies = [...this.state.movies];
    try {
      await deleteMovie(movie._id);
      movies = movies.filter(q => q._id !== movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleated.");
      else if (ex.response && ex.response.status === 403)
        toast.error("You don't authorize to delete a movie.");
    }
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    let toggledSelection = movies[index].selected;
    movies[index].selected = !toggledSelection;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = async item => {
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      searchQuery: "",
      selectedGenre: item,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(q => q.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    const { user } = auth.getCurrentUser();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItems={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {user && (
            <p>
              <Link className="btn btn-primary btn-sm" to="./movies/new">
                New Movie
              </Link>
            </p>
          )}
          {totalCount === 0 && <p>There are no movies in the database.</p>}
          {totalCount !== 0 && (
            <p>Showing {totalCount} movies in the database.</p>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          {totalCount !== 0 && (
            <React.Fragment>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
