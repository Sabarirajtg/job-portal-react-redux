import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { EditTwoTone, MoreVertRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/JobScreen.css";
import Job from "../../services/Job";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    float: "left",
    position: "relative",
    margin: "0.5rem",
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
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(4),
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
  box: {
    marginLeft: "30rem",
    marginTop: "6rem",
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
      maxWidth: "20rem",
      marginLeft: "10rem",
    },
  },
}));

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState();
  // const jobs = useSelector((state) => state.jobReducer);
  // const user = useSelector((state) => state.userReducer);
  // console.log(user);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("jobType");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const LOCAL_STORAGE = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (LOCAL_STORAGE.role === 2) {
      Job.getJobsByCompany(LOCAL_STORAGE.companyId).then((res) =>
        setJobs(res.data.data)
      );
    } else {
      Job.getAllJob().then((res) => setJobs(res.data.data));
    }
  }, []);

  useEffect(() => {
    Job.getJobsBySearch({ type, search }).then((res) => setJobs(res.data.data));
    console.log("render");
  }, [search]);

  console.log(jobs);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setJobId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(jobId);

  async function handleDelete(jobId) {
    await Job.deleteJob(jobId).then((res) => window.location.reload());
    // console.log(res.data);
  }

  return (
    <>
      <Box>
        <Typography component="div">
          {/* <Box
            textAlign="center"
            style={{ marginLeft: "14rem", marginTop: "5rem" }}
            fontWeight="fontWeightBold"
            m={1}
          >
            Filter
          </Box> */}
        </Typography>
        <Grid container spacing={3} className={classes.box}>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => setType(e.target.value)}
                value={type}
                displayEmpty
                name="company"
                label="Type"
              >
                <MenuItem value="jobType" selected="selected">
                  Job Type
                </MenuItem>
                <MenuItem value="company">Company</MenuItem>
                <MenuItem value="city">City</MenuItem>
              </Select>
            </FormControl>
          </Grid>{" "}
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="outlined-required"
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              defaultValue="Search...."
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <div className={classes.content}>
        <main>
          {/* <div className={classes.toolbar} /> */}
          <br />
          {jobs &&
            jobs.map((job) => (
              <Card
                className={classes.root}
                variant="outlined"
                style={{
                  minWidth: "25rem",
                  maxWidth: "27rem",
                  maxHeight: "25rem",
                  minHeight: "17.5rem",
                }}
              >
                {LOCAL_STORAGE.role !== 1 ? (
                  <div
                    style={{ position: "absolute", right: "1px", top: "18px" }}
                  >
                    <Button
                      color="primary"
                      size="small"
                      onClick={(e) => handleClick(e, job._id)}
                    >
                      <MoreVertRounded />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}

                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="body4" component="h1">
                    {job.name}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    // color="textPrimary"
                    variant="body4"
                    component="h2"
                    style={{fontWeight: "500"}}
                  >
                    {job.type}
                  </Typography>
                  <Typography variant="body4" component="h2">
                    {job.companyId.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h3"
                    color="textSecondary"
                  >
                    {job.companyId.address}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="p">
                    <u1 style={{ listStyle: "circle" }}>
                      <li>{job.description}</li>
                    </u1>
                  </Typography>
                </CardContent>
                {LOCAL_STORAGE.role === 2 ? (
                  <>
                    <CardActions>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          navigate("/viewapplicants", {
                            state: { jobData: job },
                          })
                        }
                      >
                        View Applicants
                      </Button>

                      <Button
                        color="primary"
                        size="small"
                        style={{
                          position: "absolute",
                          right: "20px",
                          color: "white",
                          borderColor: "#ff771c",
                        }}
                        startIcon={<EditTwoTone />}
                        variant="contained"
                        onClick={() =>
                          navigate("/addjob", {
                            state: { jobData: job },
                          })
                        }
                      >
                        Edit Job
                      </Button>
                    </CardActions>
                  </>
                ) : LOCAL_STORAGE.role === 0 ? (
                  <CardActions>
                    {/* <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        navigate("/addcompany", {
                          state: {
                            companyData: {
                              _id: job.companyId._id,
                              name: job.companyId.name,
                              address: job.companyId.address,
                            },
                          },
                        })
                      }
                    >
                      Edit Company
                    </Button> */}
                  </CardActions>
                ) : (
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        navigate("/jobdetails", {
                          state: { jobData: job },
                        })
                      }
                    >
                      View
                    </Button>
                  </CardActions>
                )}
              </Card>
            ))}
        </main>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(jobId)}
            >
              Delete
            </Button>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
