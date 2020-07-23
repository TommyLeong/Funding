import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({});

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f1f1f1",
    "&:hover": {
      backgroundColor: "#008000 ",
    },
    color: "#000000",
    "&&:hover": {
      color: "#f1f1f1",
    },
    borderRadius: 0,
    padding: 15,
    [theme.breakpoints.down(700)]: {
      fontSize: 12,
    },
  },
});

const ActionButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      data-testid="testActionButton"
      onClick={props.onClick}
      className={classes.root}
    >
      {props.buttonName}
    </Button>
  );
};

export default ActionButton;
