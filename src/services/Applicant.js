import axios from "axios";

const API_URL = "http://localhost:4000/applicants";

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class Applicant {
  getAllApplicants() {
    return axios.get(API_URL, headers);
  }

  getApplicant(jobId, applicantId) {
    return axios.get(API_URL + "/" + jobId + "/" + applicantId, headers);
  }

  getApplicantsByCompany(id) {
    return axios.get(API_URL + "/company/" + id, headers);
  }

  getApplicantsByJob(id, status) {
    return axios.get(API_URL + "/byjob/" + id + "/" + status, headers);
  }

  addApplicant(data) {
    return axios.post(API_URL, data, headers);
  }

  deleteApplicant(id) {
    return axios.delete(API_URL + "/" + id, headers);
  }

  updateApplicant(id, data) {
    return axios.put(API_URL + "/" + id, data, headers);
  }
}

export default new Applicant();
