import axios from "axios";

const USER_API_URL = `http://localhost:4000/users`;

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class User {
  getAllUsers() {
    return axios.get(USER_API_URL, headers);
  }

  login(email, password) {
    return axios.post(USER_API_URL + "/login/", {
      email: email,
      password: password,
    });
  }

  getPurchases(id) {
    return axios.get(USER_API_URL + "/" + id, headers);
  }

  addPurchase(id, data) {
    return axios.post(USER_API_URL + "/" + id, data, headers);
  }

  addUser(data) {
    return axios.post(USER_API_URL, data);
  }

  modifyUser(id, data) {
    return axios.put(USER_API_URL + "/" + id, data, headers);
  }
}
export default new User();
