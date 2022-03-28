import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Applicant from "../../services/Applicant";
import Job from "../../services/Job";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    float: "left",
    marginTop: "1rem",
    marginRight: "2rem",
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
    // display: "flex",
    // flexGrow: 1,
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
  img: {
    position: "absolute",
    right: "170px",
    top: "180px",
    "@media (max-width: 780px)": {
      display: "none",
    },
  },
  button1: {
    position: "absolute",
    right: "600px",
    top: "345px",
    "@media (max-width: 780px)": {
      position: "relative",
      right: "0",
      top: "0",
      width: "100px",
      marginTop: "10px",
    },
  },
  button2: {
    position: "absolute",
    right: "390px",
    top: "345px",
    "@media (max-width: 780px)": {
      position: "relative",
      right: "0",
      top: "0",
      width: "100px",
      marginTop: "10px",
      marginLeft: "20px",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewApplicants() {
  const classes = useStyles();
  const location = useLocation();
  const [jobs, setJobs] = useState();
  const [render, reRender] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [applicants, setApplicants] = useState([]);
  // const jobs = useSelector((state) => state.jobReducer);
  console.log(location);
  // const jobIndex = jobs.findIndex(
  //   (job) => job.id === location.state.jobData.id
  // );

  const year = location.state.jobData.date.slice(0, 4);
  const month = location.state.jobData.date.slice(5, 7);
  const day = location.state.jobData.date.slice(8, 10);
  console.log(year, month, day);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(year, month, day);
  const secondDate = new Date(yyyy, mm, dd);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  console.log(diffDays);

  useEffect(() => {
    Job.getJob(location.state.jobData._id).then((res) => {
      setJobs(res.data.data);
    });
    Applicant.getApplicantsByJob(location.state.jobData._id, status).then(
      (res) => {
        setApplicants(res.data.data);
      }
    );
  }, [render, open]);

  const handleClickOpen = (status) => {
    setStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setStatus("pending");
    setOpen(false);
  };

  console.log(applicants);

  function handleStatus(jobId, status, action) {
    // if (window.confirm("Do yo want to " + action + " the applicant?")) {
    //   // dispatch(handleApplicantStatus(jobId, applicantId, status));
    //   Applicant.updateApplicant(jobId, {
    //     status: status,
    //   }).then((res) => {
    //     setJobs(res.data.data);
    //     // console.log(res.data.data);
    //   });
    //   console.log(jobId, status);
    // }
    confirmAlert({
      title: action + " applicant",
      message: "Do yo want to " + action + " the applicant?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            Applicant.updateApplicant(jobId, {
              status: status,
            }).then((res) => {
              setJobs(res.data.data);
              // console.log(res.data.data);
              reRender(!render);
            }),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  }

  if (JSON.parse(localStorage.getItem("userData")).role === 1) {
    return (
      <>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card
          // className={classes.root}
          style={{ maxHeight: "21rem", width: "85%", marginLeft: "3rem" }}
          variant="outlined"
        >
          <img
            src="https://media.istockphoto.com/vectors/programming-javascript-or-html-code-on-laptop-computer-screen-or-php-vector-id1223982069?k=20&m=1223982069&s=170667a&w=0&h=5NMaiN7V_RTI12E7Tx4bvB5i_oXoteCPhRV9P8qz2cc="
            alt="someimage"
            width="220"
            height="200"
            className={classes.img}
          />
          <CardContent>
            <Typography
              // className={classes.title}
              // color="textSecondary"
              // gutterBottom
              variant="h1"
              component="body4"
            ></Typography>
            <Typography
              variant="body4"
              component="h1"
              gutterBottom
              style={{ margin: "0" }}
            >
              {location.state.jobData.name} - {location.state.jobData.type}
            </Typography>
            <br />
            <Typography
              variant="body4"
              component="h3"
              gutterBottom
              style={{ margin: "0" }}
            >
              {location.state.jobData.companyId.name}
            </Typography>
            <br />
            <Typography variant="h6">
              <u1 style={{ listStyle: "circle" }}>
                <li> {location.state.jobData.description}</li>
              </u1>
            </Typography>
            <br />
            <hr />
            <br />
            <Typography variant="body4" component="h4" color="textSecondary">
              Posted:
              <span style={{ color: "black" }}> {diffDays} days ago </span>
              &nbsp;| &nbsp; Job Applicants:
              <span style={{ color: "black" }}> {applicants.length} </span>
              <Button
                color="primary"
                variant="contained"
                size="small"
                className={classes.button1}
                onClick={() => handleClickOpen("approved")}
              >
                accepted applicants
              </Button>
              <Button
                color="primary"
                variant="outlined"
                size="small"
                className={classes.button2}
                onClick={() => handleClickOpen("rejected")}
              >
                rejected applicants
              </Button>
            </Typography>
          </CardContent>
        </Card>
        <div style={{ marginLeft: "3rem", width: "90%" }}>
          {applicants.length !== 0 ? (
            applicants.map((applicant) => (
              <>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {/* {applicant._id && applicant._id} */}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      Applicant Name:
                      {applicant.applicantId.firstName &&
                        applicant.applicantId.firstName +
                          " " +
                          applicant.applicantId.lastName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Email:{" "}
                      {applicant.applicantId.email &&
                        applicant.applicantId.email}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {applicant.status === "pending" ? (
                        <h3
                          style={{ color: "yellowgreen", textAlign: "center" }}
                        >
                          Pending
                        </h3>
                      ) : applicant.status === "approved" ? (
                        <h3 style={{ color: "green", textAlign: "center" }}>
                          Accepted
                        </h3>
                      ) : (
                        <h3 style={{ color: "orange", textAlign: "center" }}>
                          Rejected
                        </h3>
                      )}
                    </Typography>

                    <CardActions style={{ marginLeft: "10px" }}>
                      <Button
                        // color="primary"
                        size="small"
                        style={{
                          color: "white",
                          fontWeight: "900",
                          backgroundColor: "green",
                        }}
                        variant="contained"
                        onClick={() =>
                          handleStatus(applicant._id, "approved", "approve")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        style={{
                          color: "white",
                          fontWeight: "900",
                          backgroundColor: "#ff3030",
                          marginLeft: "45px",
                        }}
                        variant="contained"
                        onClick={() =>
                          handleStatus(applicant._id, "rejected", "reject")
                        }
                      >
                        Reject
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </>
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>No Pending Applicants</h2>
          )}
        </div>
      </main>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {status}
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer style={{ marginTop: "70px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow>
                  <TableCell>
                    {applicant.applicantId.firstName &&
                      applicant.applicantId.firstName +
                        " " +
                        applicant.applicantId.lastName}
                  </TableCell>
                  <TableCell>
                    {applicant.applicantId.email && applicant.applicantId.email}
                  </TableCell>
                  <TableCell>{applicant.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
}
