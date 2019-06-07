import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Teams = ({currentUser}) => {
  console.log(currentUser);
  return (
    <Fragment>
      <Typography>Teams</Typography>
    </Fragment>
  );
};
export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withStyles(styles)(Teams));
