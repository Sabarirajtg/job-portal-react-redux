import axios from "axios";

const API_URL = "http://localhost:4000/companies";

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class Company {
  getAllCompanies() {
    return axios.get(API_URL, headers);
  }

  getCompany(id) {
    return axios.get(API_URL + "/" + id, headers);
  }

  addCompany(data) {
    return axios.post(API_URL, data, headers);
  }

  deleteCompany(id) {
    return axios.delete(API_URL + "/" + id, headers);
  }

  updateCompany(id, data){
      return axios.put(API_URL + "/" + id, data, headers);
  }
}

export default new Company();

