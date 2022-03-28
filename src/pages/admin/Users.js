import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import User from "../../services/User";

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
    flexGrow: 1,
    paddingTop:theme.spacing(6),
    paddingLeft: theme.spacing(33),
    "@media (max-width: 780px)": {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(8),
    },
  },
}));

export default function Users() {
  const LOCAL_STORAGE = JSON.parse(localStorage.getItem("userData"));
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [openSnackbar] = useSnackbar();

  // const users = useSelector((state) => state.userReducer);

  useEffect(() => {
    User.getAllUsers().then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  console.log(users);
  const classes = useStyles();

  function handleRole(id, role) {
    if (LOCAL_STORAGE._id === id) {
      openSnackbar("You can't change your own Role!");
    } else {
      User.modifyUser(id, { role: role }).then((res) => {
        setUsers(res.data.data);
      });
      openSnackbar("success");
      // console.log()
    }
  }

  if (LOCAL_STORAGE.role === 1) {
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
        {users.map((user, index) => (
          <Card className={classes.root} key={index} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              ></Typography>
              <Typography variant="h5" component="h2">
                Name: {user.firstName + user.lastName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body2" component="p">
                User Type: {user.role === 0 ? "Admin" : "User"}
              </Typography>
            </CardContent>
            {user.role === 0 ? (
              <>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "red" }}
                    variant="outlined"
                    onClick={() => handleRole(user._id, 1)}
                  >
                    Degrade role
                  </Button>
                </CardActions>
              </>
            ) : (
              <CardActions>
                <Button
                  size="small"
                  style={{ color: "green" }}
                  variant="outlined"
                  onClick={() => handleRole(user._id, 0)}
                >
                  Make Admin
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </main>
    </>
  );
}
