import { Avatar, Button, Link } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Add, Person, Work } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: "4.7rem",
    // alignContent: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

const LOCAL_STORAGE = JSON.parse(localStorage.getItem("userData"));
function Sidebar(props) {
  const NAME = LOCAL_STORAGE.firstName;
  // if (JSON.parse(localStorage.getItem("userData")) !== null) {
  //   navigate("/jobs");
  // }
  const { window } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <Avatar alt="Remy Sharp" className={classes.large} />
        <h1 style={{ textAlign: "center" }}>{NAME}</h1>
      </div>
      <div />
      <Divider />
      <List>
        <ListItem button component={Link} href="/jobs">
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary={"Jobs"} style={{ color: "#262626" }} />
        </ListItem>
      </List>
      {LOCAL_STORAGE !== null && LOCAL_STORAGE.role === 0 ? (
        <>
          <Divider />
          <List>
            <ListItem button component={Link} href="/addjob">
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"Add Job"} style={{ color: "#262626" }} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} href="/users">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary={"Manage Users"}
                style={{ color: "#262626" }}
              />
            </ListItem>
          </List>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome, {NAME}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Sidebar;
