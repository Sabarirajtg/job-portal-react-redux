import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useSnackbar } from "react-simple-snackbar";
import Applicant from "../../services/Applicant";

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
    paddingLeft: theme.spacing(40),
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

export default function JobDetails() {
  const classes = useStyles();
  const location = useLocation();
  const [openSnackbar] = useSnackbar();
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobReducer);

  console.log(location);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    Applicant.getApplicant(location.state.jobData._id, userData._id).then(
      (res) => {
        setStatus(res.data.data[0].status);
      }
    );
  }, []);

  console.log(status);

  function applyJob(jobId, applicantId, companyId) {
    console.log(jobId, applicantId, companyId);
    if (window.confirm("Do you want to apply for this role?")) {
      Applicant.addApplicant({
        jobId,
        applicantId,
        companyId,
      }).then((res) => {
        console.log(res.data.data);
        setStatus(res.data.data.status);
      });
    }
  }

  // const index = jobs.findIndex((job) => job.id === location.state.jobData.id);
  // const applicantIndex = jobs[index].applicants.findIndex(
  //   (application) => application.id === userData[0].id
  // );
  // console.log(applicantIndex);
  // function applyJob(jobId, applicantId, firstName, lastName, email) {
  //   if (applicantIndex === -1) {
  //     if (window.confirm("Do you want to apply for this role?")) {
  //       dispatch(addApplicant(jobId, applicantId, firstName, lastName, email));
  //     }
  //   } else {
  //     openSnackbar("You already applied for this job");
  //   }

  // console.log(jobId, applicantId, firstName, lastName, email);
  // }

  // const status = userData.findIndex(
  //   (data) => data.id === location.state.jobData.id
  // );
  // console.log(status);
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card
          className={classes.root}
          variant="outlined"
          style={{ maxWidth: "30%" }}
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
          {status === undefined ? (
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  applyJob(
                    location.state.jobData._id,
                    userData._id,
                    location.state.jobData.companyId._id
                  )
                }
              >
                Apply
              </Button>
            </CardActions>
          ) : (
            <CardContent>
              <Typography
                style={{ color: "green", textAlign: "center" }}
                variant="h6"
              >
                You already applied this job
              </Typography>
            </CardContent>
          )}
        </Card>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h6" component="h2" className={classes.heading}>
              Job application status
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
            ></Typography>

            <Typography variant="body2" component="p">
              {status === "pending" ? (
                <h3 style={{ color: "yellowgreen", textAlign: "center" }}>
                  Pending
                </h3>
              ) : status === "approved" ? (
                <h3 style={{ color: "green", textAlign: "center" }}>
                  Approved
                </h3>
              ) : status === "rejected" ? (
                <h3 style={{ color: "orange", textAlign: "center" }}>
                  Rejected
                </h3>
              ) : (
                <h3>{status}</h3>
              )}
            </Typography>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
