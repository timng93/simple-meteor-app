import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {Chip, Typography, Paper} from "@material-ui/core";

const Profile = ({currentUser, classes}) => {
  console.log(currentUser);
  return (
    <Fragment>
      {currentUser ? (
        <Fragment>
          <Paper className={classes.profile}>
            <div className={classes.profileInfo}>
              <Typography className={classes.pageTitle}>My Profile</Typography>
              <Chip
                label={`Username - ${currentUser.username}`}
                className={classes.chip}
                variant="outlined"
              />
              <Chip
                label={`Email - ${currentUser.emails[0].address}`}
                className={classes.chip}
                variant="outlined"
              />
            </div>
          </Paper>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withStyles(styles)(Profile));
