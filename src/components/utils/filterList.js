import _ from "lodash";

export function filterGenreList(items, genre) {
  return _(items)
    .filter(i => i.genre.name === genre.name)
    .value();
}
