import * as actions from "./actionType";

var today = new Date();

export const addUser = (id, firstName, lastName, email, password) => ({
  type: actions.USER,
  payload: {
    id,
    firstName,
    lastName,
    email,
    password,
  },
});

export const addJob = (id, jobName, type, description) => ({
  type: actions.ADD_JOB,
  payload: {
    id,
    jobName,
    type,
    description,
    date:
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear(),
  },
});

export const changeRole = (id, role) => ({
  type: actions.ROLE,
  payload: {
    id,
    role,
  },
});

export const addApplicant = (
  jobId,
  applicantId,
  firstName,
  lastName,
  email
) => ({
  type: actions.ADD_APPLICANT,
  payload: {
    jobId,
    applicantId,
    firstName,
    lastName,
    email,
  },
});

export const handleApplicantStatus = (jobId, applicantId, status) => ({
  type: actions.APP_STATUS,
  payload: {
    jobId,
    applicantId,
    status,
  },
});

export const modifyJob = (jobId, jobName, type, description) => ({
  type: actions.MODIFY_JOB,
  payload: {
    jobId,
    jobName,
    type,
    description,
  },
});

export const deleteJob = (jobId) => ({
  type: actions.DELETE_JOB,
  payload: {
    jobId,
  },
});
