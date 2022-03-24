import axios from "axios";

const URL = "http://localhost:4000/jobs";

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class Job {
  getAllJob() {
    return axios.get(URL, headers);
  }

  getJobsByCompany(id) {
    return axios.get(URL + "/jobsbycompany/" + id, headers);
  }

  getJob(id) {
    return axios.get(URL + "/" + id, headers);
  }

  addJob(data) {
    return axios.post(URL, data, headers);
  }

  deleteJob(id) {
    return axios.delete(URL + "/" + id, headers);
  }

  // updateJob(id, data) {
  //   return axios.put(URL + "/" + id, data);
  // }

  addApplicant(jobId, data) {
    return axios.post(URL + "/addapplicant/" + jobId, data, headers);
  }

  modifyJob(jobId, data) {
    return axios.put(URL + "/" + jobId, data, headers);
  }

  updateApplicant(jobId, data) {
    return axios.put(URL + "/updateapplicant/" + jobId, data, headers);
  }

  userJobStatus(jobId, applicantId) {
    return axios.get(
      URL + "/" + jobId + "/userjobstatus/" + applicantId,
      headers
    );
  }
}

export default new Job();
