import { makeStyles } from "@material-ui/core/styles";
import { default as React } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(33),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>hello world</h1>
      </main>
    </>
  );
}
