import axios from "axios";

const URL =  "http://localhost:4000/users";

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class User {
  getAllUsers() {
    return axios.get(URL, headers);
  }

  login(email, password) {
    return axios.post(URL + "/login/", {
      email: email,
      password: password,
    });
  }

  getPurchases(id) {
    return axios.get(URL + "/" + id, headers);
  }

  addPurchase(id, data) {
    return axios.post(URL + "/" + id, data, headers);
  }

  addUser(data) {
    return axios.post(URL, data);
  }

  modifyUser(id, data) {
    return axios.put(URL + "/" + id, data, headers);
  }
}
export default new User();
