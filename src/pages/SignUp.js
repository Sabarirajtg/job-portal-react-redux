import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../services/User";
import Company from "../services/Company";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

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
}));

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {};
    if (url === "/companysignup") {
      userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        companyId: data.get("company"),
        role: 2,
      };
    } else {
      userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };
    }

    console.log(userData);

    User.addUser(userData).then((res) => {
      if (res.data.success) {
        alert(res.data.msg);
        window.location.replace("/");
      } else {
        alert(res.data.msg);
      }
    });

    // dispatch(
    //   addUser(
    //     uuid(),
    //     data.get("firstName"),
    //     data.get("lastName"),
    //     data.get("email"),
    //     data.get("password")
    //   )
    // ).then(navigate("/"));
  };
  const classes = useStyles();
  let url = new URL(window.location.href).pathname;
  if (url) {
    console.log(url);
  }

  useEffect(() => {
    Company.getAllCompanies().then((res) => setCompanies(res.data.data));
  }, []);
  console.log(companies);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              {url === "/companysignup" ? (
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Company
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // onChange={handleChange}
                    name="company"
                    label="Company"
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    {companies.map((company) => (
                      <MenuItem key={company.id} value={company._id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <> </>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept all the terms"
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
