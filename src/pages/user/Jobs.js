import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { deleteJob } from "../../redux/actions";
import Job from "../../services/Job";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    float: "left",
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
    paddingLeft: theme.spacing(33),
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
  box: {
    marginLeft: "30rem",
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
}));

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  // const jobs = useSelector((state) => state.jobReducer);
  // const user = useSelector((state) => state.userReducer);
  // console.log(user);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("jobType");
  const dispatch = useDispatch();
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

  console.log(jobs);

  async function handleDelete(jobId) {
    await Job.deleteJob(jobId).then((res) => window.location.reload());
    // console.log(res.data);
  }

  return (
    <>
      <Sidebar />
      <Box>
        <Typography component="div">
          <Box
            textAlign="center"
            style={{ marginLeft: "14rem" }}
            fontWeight="fontWeightBold"
            m={1}
          >
            Filter
          </Box>
        </Typography>
        <Grid container spacing={3} className={classes.box}>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => setType(e.target.value)}
                value={type}
                displayEmpty
                name="company"
                label="Company"
              >
                <MenuItem value="jobType" selected="selected">
                  Job Type
                </MenuItem>
                <MenuItem value="company">Company</MenuItem>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        {jobs &&
          jobs
            .filter((data) => {
              if (search == null) return data;
              else {
                if (
                  type === "jobType" &&
                  data.type.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                } else if (
                  type === "company" &&
                  data.companyId.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                } else {
                  return null;
                }
              }
            })
            .map((job) => (
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="h2">
                    Job Name: {job.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {job.type}
                  </Typography>
                  <Typography variant="body4" component="h2">
                    {job.companyId.name},
                  </Typography>
                  <Typography variant="body1" component="h3">
                    {job.companyId.address}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="p">
                    {job.description}
                  </Typography>
                </CardContent>
                {LOCAL_STORAGE.role === 2 ? (
                  <>
                    <CardActions>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
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
                        variant="contained"
                        onClick={() =>
                          navigate("/addjob", {
                            state: { jobData: job },
                          })
                        }
                      >
                        Modify Job
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete Job
                      </Button>
                    </CardActions>
                  </>
                ) : LOCAL_STORAGE.role === 0 ? (
                  <CardActions>
                    <Button
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
                    </Button>
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
    </>
  );
}
