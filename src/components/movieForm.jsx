import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService.js";

class Movie extends Form {
  state = {
    genres: [],
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const id = this.props.match.params.id;
      if (id === "new") return;

      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notFound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
    return {
      _id,
      title,
      genreId: genre._id,
      numberInStock,
      dailyRentalRate
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await saveMovie(data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <main className="container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </main>
    );
  }
}

export default Movie;
