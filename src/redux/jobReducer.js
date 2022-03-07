import * as actions from "./actionType";

export default function jobReducer(state = [], action) {
  if (action.type === actions.ADD_JOB) {
    return [
      ...state,
      {
        id: action.payload.id,
        jobName: action.payload.jobName,
        type: action.payload.type,
        description: action.payload.description,
        date: action.payload.date,
        applicants: [],
      },
    ];
  } else if (action.type === actions.DELETE_JOB) {
    return state.filter((job) => job.id !== action.payload.jobId);
  } else if (action.type === actions.ADD_APPLICANT) {
    const newState = [...state];
    const index = state.findIndex((job) => job.id === action.payload.jobId);
    const newApplicant = {
      id: action.payload.applicantId,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      status: "pending",
    };
    if (index !== -1) newState[index].applicants.push(newApplicant);
    return newState;
  } else if (action.type === actions.APP_STATUS) {
    const newState = [...state];
    const index = state.findIndex((job) => job.id === action.payload.jobId);
    const applicants = [...newState[index].applicants];
    const applicantIndex = applicants.findIndex(
      (application) => application.id === action.payload.applicantId
    );
    if (applicantIndex !== -1)
      newState[index].applicants[applicantIndex].status = action.payload.status;
    return newState;
  } else if (action.type === actions.MODIFY_JOB) {
    const newState = [...state];
    const index = state.findIndex((job) => job.id === action.payload.jobId);
    if (index !== -1) {
      newState[index].jobName = action.payload.jobName;
      newState[index].type = action.payload.type;
      newState[index].description = action.payload.description;
    }
    return newState;
  } else {
    return state;
  }
}
