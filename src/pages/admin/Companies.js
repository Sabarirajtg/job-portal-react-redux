import { Box, TextField } from "@material-ui/core";
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
import Company from "../../services/Company";
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
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(60),
    maxWidth: 1200,
    color: "black",
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
}));

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  // const jobs = useSelector((state) => state.jobReducer);
  // const user = useSelector((state) => state.userReducer);
  // console.log(user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    Company.getAllCompanies().then((res) => setCompanies(res.data.data));
  }, []);

  console.log(companies);
  async function handleDelete(jobId) {
    await Job.deleteJob(jobId).then((res) => window.location.reload());
    // console.log(res.data);
  }

  return (
    <>
      <Sidebar />
      <Box>
        <TextField
          className={classes.box}
          required
          id="outlined-required"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          defaultValue="Search...."
          variant="outlined"
        />
      </Box>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        {companies &&
          companies
            .filter((data) => {
              if (search == null) return data;
              else {
                if (data.name.toLowerCase().includes(search.toLowerCase())) {
                  return data;
                } else {
                  return null;
                }
              }
            })
            .map((company) => (
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="h2">
                    Company Name: {company.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {company.address}
                  </Typography>
                </CardContent>
                {JSON.parse(localStorage.getItem("userData")).role === 0 ? (
                  <>
                    <CardActions>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() =>
                          navigate("/addcompany", {
                            state: { companyData: company },
                          })
                        }
                      >
                        Edit Company Details
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => handleDelete(company._id)}
                      >
                        Delete Company
                      </Button>
                    </CardActions>
                  </>
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
