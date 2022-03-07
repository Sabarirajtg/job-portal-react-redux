import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Sidebar from "../../components/Sidebar";
import { handleApplicantStatus } from "../../redux/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    float: "left",
    margin: "0.5rem",
    marginLeft: "8rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(20),
  },
  heading: {
    textAlign: "center",
  },
}));

export default function ViewApplicants() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobReducer);
  console.log(location);
  const jobIndex = jobs.findIndex(
    (job) => job.id === location.state.jobData.id
  );

  function handleStatus(jobId, applicantId, status, action) {
    if (window.confirm("Do yo want to " + action + " the applicant?")) {
      dispatch(handleApplicantStatus(jobId, applicantId, status));
      console.log(jobId, applicantId, status);
      //   const newState = [...jobs];
      //   const index = newState.findIndex((job) => job.id === jobId);
      //   console.log(index);
      //   const applicants = [...newState[index].applicants];
      //   console.log(applicants);
      //   const applicantIndex = applicants.findIndex(
      //     (application) => application.id === applicantId
      //   );
      //   console.log(applicantIndex);
      //   if (applicantIndex !== -1)
      //     newState[index].applicants[applicantIndex].status = status;
      //   console.log(newState);
      // }
    }
  }

  // const userData = [JSON.parse(localStorage.getItem("userData"))];

  if (JSON.parse(localStorage.getItem("userData")).role === 1) {
    return (
      <>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h1>
            You don't have access! If you think this a mistake try contacting
            admin
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card
          className={classes.root}
          style={{ maxHeight: "21rem" }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h6" component="h2">
              Job Name: {location.state.jobData.jobName}
            </Typography>
            <br />
            <Typography variant="h6" component="h2">
              Job Type/Role: {location.state.jobData.type}
            </Typography>
            <br />
            <Typography variant="h6">
              Description: {location.state.jobData.description}
            </Typography>
            <br />
            <Typography variant="h6">
              Updated on: {location.state.jobData.date}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
          {jobs[jobIndex].applicants.map((job) => (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {/* {job.id && job.id} */}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Applicant Name:
                    {job.firstName && job.firstName + job.lastName}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Email: {job.email && job.email}
                  </Typography>
                  {jobIndex !== -1 ? (
                    <Typography variant="body2" component="p">
                      {job.status === "pending" ? (
                        <h3
                          style={{ color: "yellowgreen", textAlign: "center" }}
                        >
                          Pending
                        </h3>
                      ) : job.status === "Approved" ? (
                        <h3 style={{ color: "green", textAlign: "center" }}>
                          Accepted
                        </h3>
                      ) : (
                        <h3 style={{ color: "orange", textAlign: "center" }}>
                          Rejected
                        </h3>
                      )}
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <CardActions style={{ marginLeft: "27px" }}>
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() =>
                        handleStatus(
                          location.state.jobData.id,
                          job.id,
                          "Approved",
                          "approve"
                        )
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() =>
                        handleStatus(
                          location.state.jobData.id,
                          job.id,
                          "Rejected",
                          "reject"
                        )
                      }
                    >
                      Reject
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </>
          ))}
        </Card>
      </main>
    </>
  );
}
