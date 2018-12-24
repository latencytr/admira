import http from "./httpService";

const apiUser = "/users";

function userUrl(id) {
  return `${apiUser}/${id}`;
}

export function getUsers() {
  return http.get(apiUser);
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export async function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    if (body.password === "") delete body.password;
    delete body._id;
    return http.put(userUrl(user._id), body);
  } else {
    return http.post(apiUser, user);
  }
}

export async function changePassword(user, password) {
  const body = {
    email: user.email,
    name: user.name,
    block: user.block,
    doorNumber: user.doorNumber,
    isAdmin: user.isAdmin,
    password: password
  };
  return http.put(userUrl(user._id), body);
}

export async function deleteUser(id) {
  return http.delete(userUrl(id));
}
