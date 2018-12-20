import http from "./httpService";
import * as userService from "./userService";
const apiDue = "/dues";

function dueUrl(id) {
  return `${apiDue}/${id}`;
}

export function getDues() {
  return http.get(apiDue);
}

export function getDue(id) {
  return http.get(dueUrl(id));
}

export async function saveDue(due) {
  if (due._id) {
    const body = { ...due };
    delete body._id;
    return http.put(dueUrl(due._id), body);
  } else {
    return http.post(apiDue, due);
  }
}

export async function saveMonthlyDueForAllUsers(
  month,
  year,
  duePrice,
  priceId
) {
  const { data: users } = await userService.getUsers();
  const dues = users.map(user => {
    const dueDate = `${year}/${month}/01`;
    return { dueDate, duePrice, userId: user._id, priceId };
  });
  return dues.map(due => http.post(apiDue, due));
}

export async function deleteDue(id) {
  return http.delete(dueUrl(id));
}
