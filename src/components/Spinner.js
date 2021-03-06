import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress thickness = {4} size="100px" />
    </div>
  );
}