import React from "react";
import AccountsUI from "../../components/AccountsUI";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const Welcome = ({classes}) => {
  return (
    <div className={classes.form}>
      <AccountsUI />
    </div>
  );
};

Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);
