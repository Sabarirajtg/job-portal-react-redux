import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addJob, modifyJob } from "../../redux/actions";
import Sidebar from "../../components/Sidebar";
import { v4 as uuid } from "uuid";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import Company from "../../services/Company";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(33),
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
}));

export default function AddCompany() {
  const [openSnackbar] = useSnackbar();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    if (location.state !== null) {
      setId(location.state.companyData._id);
      setName(location.state.companyData.name);
      setAddress(location.state.companyData.address);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const companyData = { name, address };

    if (location.state !== null) {
      // dispatch(modifyJob(id, jobName, type, description));
      Company.updateCompany(id, companyData)
      openSnackbar("Submitted");
    } else {
      Company.addCompany(companyData)
      openSnackbar("Submitted");
    }
  };
  const classes = useStyles();

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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add a new Company
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    label="Company Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    multiline
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    fullWidth
                    label="Address"
                    name="address"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => navigate("/companies")}
          >
            View all Companies
          </Button>
        </Container>
      </main>
    </>
  );
}
