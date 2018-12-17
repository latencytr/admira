import http from "./httpService";

const apiUser = "/users";

export function register(user) {
  const {
    identityCardNo,
    email,
    password,
    name,
    block,
    doorNumber,
    isAdmin
  } = user;
  return http.post(apiUser, {
    identityCardNo,
    email,
    password,
    name,
    block,
    doorNumber,
    isAdmin
  });
}
