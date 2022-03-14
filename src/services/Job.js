import axios from "axios";

const JOB_API_URL = `http://localhost:4000/jobs`;

const headers = {
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class Job {
  getAllJob() {
    return axios.get(JOB_API_URL, headers);
  }

  getJob(id) {
    return axios.get(JOB_API_URL + "/" + id, headers);
  }

  addJob(data) {
    return axios.post(JOB_API_URL, data, headers);
  }

  deleteJob(id) {
    return axios.delete(JOB_API_URL + "/" + id, headers);
  }

  // updateJob(id, data) {
  //   return axios.put(JOB_API_URL + "/" + id, data);
  // }

  addApplicant(jobId, data) {
    return axios.post(JOB_API_URL + "/addapplicant/" + jobId, data, headers);
  }

  modifyJob(jobId, data) {
    return axios.put(JOB_API_URL + "/" + jobId, data, headers);
  }

  updateApplicant(jobId, data) {
    return axios.put(JOB_API_URL + "/updateapplicant/" + jobId, data, headers);
  }

  userJobStatus(jobId, applicantId) {
    return axios.get(
      JOB_API_URL + "/" + jobId + "/userjobstatus/" + applicantId,
      headers
    );
  }
}

export default new Job();
