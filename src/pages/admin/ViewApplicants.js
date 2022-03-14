import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Sidebar from "../../components/Sidebar";
import { handleApplicantStatus } from "../../redux/actions";
import Job from "../../services/Job";

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
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
  heading: {
    textAlign: "center",
  },
}));

export default function ViewApplicants() {
  const classes = useStyles();
  const location = useLocation();
  const [jobs, setJobs] = useState();
  const dispatch = useDispatch();
  // const jobs = useSelector((state) => state.jobReducer);
  console.log(location);
  // const jobIndex = jobs.findIndex(
  //   (job) => job.id === location.state.jobData.id
  // );

  useEffect(() => {
    Job.getJob(location.state.jobData._id).then((res) => {
      setJobs(res.data.data);
    });
  }, []);

  console.log(jobs);

  function handleStatus(jobId, applicantId, status, action) {
    if (window.confirm("Do yo want to " + action + " the applicant?")) {
      // dispatch(handleApplicantStatus(jobId, applicantId, status));
      Job.updateApplicant(jobId, { _id: applicantId, status: status }).then(
        (res) => {
          setJobs(res.data.data);
          // console.log(res.data.data);
        }
      );
      console.log(jobId, applicantId, status);
    }
  }

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
              Job Name: {location.state.jobData.name}
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
          {jobs &&
            jobs.applicants.map((job) => (
              <>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {/* {job._id && job._id} */}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      Applicant Name:
                      {job.firstName && job.firstName + job.lastName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Email: {job.email && job.email}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {job.status === "pending" ? (
                        <h3
                          style={{ color: "yellowgreen", textAlign: "center" }}
                        >
                          Pending
                        </h3>
                      ) : job.status === "approved" ? (
                        <h3 style={{ color: "green", textAlign: "center" }}>
                          Accepted
                        </h3>
                      ) : (
                        <h3 style={{ color: "orange", textAlign: "center" }}>
                          Rejected
                        </h3>
                      )}
                    </Typography>

                    <CardActions style={{ marginLeft: "27px" }}>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() =>
                          handleStatus(
                            location.state.jobData._id,
                            job._id,
                            "approved",
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
                            location.state.jobData._id,
                            job._id,
                            "rejected",
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
