import http from "./httpService";

const apiPrice = "/prices";

function priceUrl(id) {
  return `${apiPrice}/${id}`;
}

export function getPrices() {
  return http.get(apiPrice);
}

export function getPrice(id) {
  return http.get(priceUrl(id));
}

export async function savePrice(price) {
  if (price._id) {
    const body = { ...price };
    delete body._id;
    return http.put(priceUrl(price._id), body);
  } else {
    return http.post(apiPrice, price);
  }
}

export async function deletePrice(id) {
  return http.delete(priceUrl(id));
}
