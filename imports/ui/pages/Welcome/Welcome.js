import React from "react";
import AccountsUI from "../../components/AccountsUI";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Grid, Typography} from "@material-ui/core";

const Welcome = ({classes}) => {
  return (
    <div className={classes.form}>
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid className={classes.content} item xs={12} sm={12} md={6}>
          <Typography className={classes.header}>
            Welcome to Team-Mates! 
          </Typography>
          <AccountsUI />
        </Grid>
      </Grid>
    </div>
  );
};

Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);
