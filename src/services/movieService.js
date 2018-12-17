import http from "./httpService";

const apiMovie = "/movies";

function movieUrl(id) {
  return `${apiMovie}/${id}`;
}

export function getMovies() {
  return http.get(apiMovie);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return http.post(apiMovie, movie);
  }
}

export async function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
