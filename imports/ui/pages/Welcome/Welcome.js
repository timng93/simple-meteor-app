import React from "react";
import AccountsUI from "../../components/AccountsUI";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";

const Welcome = ({classes}) => {
  console.log("from the welcome page");
  return (
    <div className={classes.form}>
      <AccountsUI />
    </div>
  );
};

export default withStyles(styles)(Welcome);
