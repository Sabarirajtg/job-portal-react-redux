import { Button, Link } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Add, Apartment, Business, Person, Work } from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const LOCAL_STORAGE = JSON.parse(localStorage.getItem("userData"));

export default function SidebarV1() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const NAME = LOCAL_STORAGE.firstName;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      {/* <div>
        <Avatar alt="Remy Sharp" className={classes.large} />
        <h1 style={{ textAlign: "center" }}>{NAME}</h1>
      </div> */}
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
          <Divider />
          <List>
            <ListItem button component={Link} href="/companies">
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText
                primary={"Companies"}
                style={{ color: "#262626" }}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} href="/addcompany">
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText
                primary={"Add Company"}
                style={{ color: "#262626" }}
              />
            </ListItem>
          </List>
        </>
      ) : (
        <></>
      )}
      {LOCAL_STORAGE !== null && LOCAL_STORAGE.role === 2 ? (
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
        </>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Welcome, {NAME}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("userData");
              localStorage.removeItem("token");
              window.location.replace("/");
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {drawer}
      </Drawer>
    </div>
  );
}
